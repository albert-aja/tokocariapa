cara menjalankan aplikasi :

1. buka 2 terminal
2. pada terminal manapun, jalanakan perintah "npm i". tunggu hingga proses selesai
3. pada terminal pertama, jalankan perintah "npm run dev"
4. pada terminal kedua, jalankan perintah "cd frontend", lalu perintah "npm start"

rate limiter :

- file rate limiter ada di "backend/middleware/rateLimiter.js"
- rate limiter dilakukan dengan membatasi user untuk melakukan request list barang sebanyak 5 kali per 10 menit