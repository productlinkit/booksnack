# BookSnack Clone (static)

Cara pakai: klik dua kali `index.html`, atau jalankan server lokal (`python3 -m http.server 8080`) lalu buka http://localhost:8080/. Tanpa install apa pun.
`index.html` otomatis membuka onboarding untuk pengunjung baru, atau langsung ke Home kalau onboarding sudah selesai.

## Struktur folder
- `index.html`: pintu masuk, mengarahkan ke onboarding atau Home
- `pages/`: satu file HTML per halaman
  - Onboarding: `splash`, `welcome`, `categories`, `vibes`, `signup`, `trial`, `all-set`
  - Utama: `home` (feed), `library` (My Library), `explore`, `videos`, `book` (detail buku), `notifications`, `ask` (ASK.AI)
  - Profile: `profile`, `edit-profile`, `subscription`, `reading-preference`, `accessibility`, `notification-settings`, `language`, `liked-books`, `highlights`, `faqs`
- `css/`
  - `base.css`: warna (`:root`), layout, navigasi, tombol, form, kartu (dipakai semua halaman)
  - `onboarding.css`, `home.css`, `explore.css`, `ask.css`, `profile.css`: style per bagian
- `js/`
  - `data.js`: kategori, buku (42 cover), ikon kategori, reading vibes
  - `common.js`: helper bersama (penyimpanan, toast, bottom nav, sheet, tema baca, aksesibilitas)
  - `pages/<nama>.js`: logika tiap halaman (namanya sama dengan file di `pages/`)
- `assets/`: logo, cover buku, ilustrasi onboarding & empty state

## Catatan
- Ini replika tampilan, bukan kode asli BookSnack. Backend, login Google, pembayaran, dan AI masih demo.
- Semua data (like, save, highlight, komentar, profil, plan, pengaturan) tersimpan di browser (localStorage, kunci `bs_*`). Tombol **Log out** di Profile menghapusnya.
- Audio memakai suara bawaan browser (Web Speech API).
- Untuk online: upload folder ini ke Netlify / Vercel / GitHub Pages.
