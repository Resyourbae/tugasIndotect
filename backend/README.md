# Backend Auth API

## Cara Menjalankan

1. **Aktifkan virtual environment (opsional, tapi disarankan):**
   ```sh
   python -m venv venv
   venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Buat file `.env` di folder backend** (lihat contoh di bawah).

4. **Jalankan server:**
   ```sh
   python -m app.main
   ```

## Template .env

```
DB_HOST=localhost
DB_NAME=db_auth 
DB_USER=postgres
DB_PASS=(password Postgres lu yang dibikin waktu instalasi)
DB_PORT=5432
```

## Struktur Database

Pastikan sudah membuat tabel berikut di PostgreSQL:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    nama VARCHAR(100),
    bio TEXT
);
```

## Endpoints

- `POST   /auth/register` — Register user baru
- `POST   /auth/login` — Login user
- `GET    /user/profile?username=...` — Ambil profil user
- `POST   /user/profile` — Update nama & bio user
- `DELETE /user/delete?username=...` — Hapus user

## Catatan

- Jangan upload file `.env` ke repository!
- Untuk development, CORS diaktifkan untuk semua origin.
- Ganti password database di `.env` sesuai kebutuhanmu.
- Pastikan memakai terminal yang berbeda untuk server Front, Back, Host

