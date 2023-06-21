cara menjalankan aplikasi :

1. buka 2 terminal
3. pada terminal pertama, jalankan perintah "npm i". tunggu hingga proses selesai. lalu jalankan perintah "npm run dev".
4. pada terminal kedua, jalankan perintah "cd frontend", lalu jalankan perintah "npm i" dan tunggu hingga proses selesai. selanjutnya jalankan perintah "npm start"

rate limiter :

- file rate limiter ada di "backend/middleware/rateLimiter.js"
- rate limiter dilakukan dengan membatasi user untuk melakukan request list barang sebanyak 5 kali per 10 menit
