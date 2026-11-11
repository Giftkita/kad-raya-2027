// KATALOG untuk Live Try-On
// Letak fail ini dan semua gambar dalam folder yang SAMA dengan tryon.html.
//
// Setiap barang:
//   nama      nama yang pelanggan nampak
//   kategori  tentukan tab dan penapis.
//             Tab Fesyen: baju, seluar, tudung, beg, kasut, aksesori (atau apa-apa kategori lain)
//             Tab Makeup: gincu, foundation, bedak, blusher, pembayang mata, celak, maskara, kening
//   gambar    nama fail gambar. Untuk makeup boleh dikosongkan kalau "warna" diisi.
//   warna     (makeup sahaja) kod warna shade, cth "#A8433A"
//   harga     boleh kosongkan: ""
//   link      link affiliate (Shopee / TikTok Shop). Kosong = tiada butang Beli
//   tag       jenis, gaya, warna: untuk carian dan cadangan AI
//
// Nak tambah barang? Salin satu blok { ... }, dan jangan lupa koma di antara blok.
// Gambar terbaik: barang sahaja, latar putih, tanpa model, sekitar 1000px.

window.KATALOG = [
  // ===== FESYEN =====
  { nama: "T-shirt Biru",       kategori: "baju",  gambar: "baju-1.jpg",  harga: "RM29",  link: "", tag: "t-shirt, kasual, biru" },
  { nama: "Hoodie Kelabu",      kategori: "baju",  gambar: "baju-2.jpg",  harga: "RM59",  link: "", tag: "hoodie, kasual, kelabu" },
  { nama: "Jaket Kuning",       kategori: "baju",  gambar: "baju-3.jpg",  harga: "RM79",  link: "", tag: "jaket, streetwear, kuning" },
  { nama: "Blazer Navy",        kategori: "baju",  gambar: "baju-4.jpg",  harga: "RM99",  link: "", tag: "blazer, formal, pejabat, navy" },
  { nama: "Beg Tangan Merah",   kategori: "beg",   gambar: "beg-1.jpg",   harga: "RM69",  link: "", tag: "beg tangan, merah, majlis" },
  { nama: "Sneaker Navy",       kategori: "kasut", gambar: "kasut-1.jpg", harga: "RM89",  link: "", tag: "sneaker, kasual, navy" },

  // ===== MAKEUP =====
  { nama: "Gincu Merah Bata",        kategori: "gincu",          warna: "#A8433A", gambar: "", harga: "RM25", link: "", tag: "matte, merah bata, harian" },
  { nama: "Gincu Nude Peach",        kategori: "gincu",          warna: "#D9907A", gambar: "", harga: "RM25", link: "", tag: "nude, peach, pejabat" },
  { nama: "Gincu Mauve",             kategori: "gincu",          warna: "#B5607A", gambar: "", harga: "RM25", link: "", tag: "mauve, merah jambu" },
  { nama: "Blusher Peach",           kategori: "blusher",        warna: "#F2A48D", gambar: "", harga: "RM32", link: "", tag: "peach, natural" },
  { nama: "Pembayang Mata Gangsa",   kategori: "pembayang mata", warna: "#8A5A3C", gambar: "", harga: "RM38", link: "", tag: "gangsa, coklat, majlis" }
];
