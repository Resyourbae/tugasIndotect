import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";


function Login({ setIsLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      //GANTI URL NYA SETIAP KALI RESTART HOSTING NGROK
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setIsLogin(true);
        localStorage.setItem("username", form.username);
        navigate("/profile");
      } else {
        setError(data.error || "Login gagal.");
      }
    } catch {
      setError("Gagal terhubung ke server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a8d0d3]">
      <div className="flex max-w-[900px] w-full bg-white/0 rounded-[30px] shadow-2xl overflow-hidden mx-auto">
        {/* Kiri */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-[#a8d0d3] p-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">HALO!</h1>
          <p className="text-2xl text-black text-center">Selamat Datang di Website Kami.</p>
        </div>
        {/* Kanan */}
        <div className="flex flex-col justify-center w-1/2 bg-white p-12 rounded-r-[30px]">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-black">Login</h2>
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
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
              {error && (
                <div className="text-red-500 text-center font-bold">{error}</div>
              )}
              <button
                type="submit"
                className="w-full bg-[#a8d0d3] text-white font-bold py-3 rounded-xl text-lg hover:bg-[#8bb8bb] transition"
              >
                Login
              </button>
            </form>
            <div className="mt-8 text-center">
              <span className="text-black text-base">Belum Punya Akun? </span>
              <Link to="/register" className="text-[#a8d0d3] font-bold hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;