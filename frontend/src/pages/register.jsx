import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//fungsi registrasi
function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  //Fungsi Perubahan
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  //Fungsi Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Konfirmasi Password
    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    try {
      //memanggil Server dan Menyiapkan untuk penyimpanan di Database
      //GANTI URL NYA SETIAP KALI RESTART HOSTING NGROK
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          nama: form.nama,
        }),
      });
      const data = await res.json();

      //konfirmasi data masuk
      if (res.ok) {
        setSuccess("Registrasi berhasil! Silakan login.");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(data.error || "Registrasi gagal.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a8d0d3]">
      <div className="flex max-w-[900px] w-full bg-white/0 rounded-[30px] shadow-2xl overflow-hidden mx-auto">
        {/* Kiri */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-[#a8d0d3] p-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            HALO!
          </h1>
          <p className="text-2xl text-black text-center">
            Selamat Datang di Website Kami.
          </p>
        </div>
        {/* Kanan */}
        <div className="flex flex-col justify-center w-1/2 bg-white p-12 rounded-r-[30px]">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-black">
              Register Account
            </h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
                value={form.nama}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
                value={form.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Konfirmasi Password"
                className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              {error && (
                <div className="text-red-500 text-center font-bold">{error}</div>
              )}
              {success && (
                <div className="text-green-600 text-center font-bold">{success}</div>
              )}
              <button
                type="submit"
                className="w-full bg-[#a8d0d3] text-white font-bold py-3 rounded-xl text-lg hover:bg-[#8bb8bb] transition"
              >
                Register
              </button>
            </form>
            <div className="mt-8 text-center">
              <span className="text-black text-base">Sudah Punya Akun? </span>
              <Link
                to="/"
                className="text-[#a8d0d3] font-bold hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;