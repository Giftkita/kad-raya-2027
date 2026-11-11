// Cloudflare Worker untuk Live Try-On: sorok Gemini API key + caj kredit setiap gambar (biasa 1, HD 2).
//
// Persediaan (sekali sahaja):
//   1. Cipta Worker baru, tampal fail ini.
//   2. Cipta satu KV namespace dan bind ke Worker dengan nama: KREDIT
//   3. Tambah dua secret: GEMINI_KEY (API key Gemini kau) dan ADMIN_SECRET (kata laluan pilihan kau)
//   4. Tukar ALLOWED_ORIGINS di bawah kepada alamat laman kau.
//   5. Letak URL Worker dalam CONFIG.PROXY_URL di tryon.html
//
// Tambah kredit untuk pelanggan (lepas dia bayar), buka di browser:
//   https://<worker-kau>/admin?secret=ADMIN_SECRET&kod=TRY-8K2M&kredit=10

const ALLOWED_ORIGINS = ['https://giftkita.github.io'];   // tukar ikut alamat sebenar laman kau
const CAJ = { image: 1, hd: 2, text: 0 };                  // kredit setiap panggilan: gambar biasa 1, gambar HD 2, analisis gaya percuma

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Kod',
      'Access-Control-Expose-Headers': 'X-Baki',
      'Vary': 'Origin'
    };
    const json = (obj, status, extra = {}) => new Response(JSON.stringify(obj), { status, headers: { ...cors, ...extra, 'Content-Type': 'application/json' } });
    const fail = (message, status) => json({ error: { message } }, status);

    // ---- admin: tambah kredit ----
    if (url.pathname === '/admin') {
      if (!env.ADMIN_SECRET || url.searchParams.get('secret') !== env.ADMIN_SECRET) return fail('Tidak dibenarkan', 403);
      const kod = (url.searchParams.get('kod') || '').trim().toUpperCase();
      const tambah = parseInt(url.searchParams.get('kredit') || '0', 10);
      if (!kod || !Number.isFinite(tambah)) return fail('Perlu kod dan kredit', 400);
      const baki = Math.max(0, (parseInt(await env.KREDIT.get(kod) || '0', 10) || 0) + tambah);
      await env.KREDIT.put(kod, String(baki));
      return json({ kod, baki }, 200);
    }

    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST' || !ALLOWED_ORIGINS.includes(origin)) return fail('Tidak dibenarkan', 403);

    const model = url.searchParams.get('model') || '';
    const k = url.searchParams.get('kind');
    const kind = k === 'text' ? 'text' : k === 'hd' ? 'hd' : 'image';
    if (!/^[a-z0-9.\-]+$/.test(model)) return fail('Model tak sah', 400);
    // elak orang guna kind=text untuk dapat gambar percuma
    if (kind === 'text' && /image|banana/.test(model)) return fail('Model tak sah', 400);
    // model Pro hanya untuk kind=hd (2 kredit)
    if (kind === 'image' && /pro/.test(model)) return fail('Model tak sah', 400);

    const kod = (req.headers.get('X-Kod') || '').trim().toUpperCase();
    const simpan = kod ? await env.KREDIT.get(kod) : null;
    if (simpan === null) return fail('Kod tak sah', 401);
    const baki = parseInt(simpan, 10) || 0;
    const caj = CAJ[kind];
    if (baki < caj) return fail('Kredit habis', 402);

    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_KEY },
      body: await req.text()
    });
    const text = await r.text();

    // tolak kredit hanya bila Gemini berjaya
    let baru = baki;
    if (r.ok && caj > 0) { baru = baki - caj; await env.KREDIT.put(kod, String(baru)); }
    return new Response(text, { status: r.status, headers: { ...cors, 'Content-Type': 'application/json', 'X-Baki': String(baru) } });
  }
};
