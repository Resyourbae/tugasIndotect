import React from "react";
import { Link } from "react-router-dom";

function Login({ setIsLogin }) {
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLogin(true);
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
            <h2 className="text-3xl font-bold mb-8 text-black">Create Account</h2>
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Nama"
                className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#a8d0d3] text-white font-bold py-3 rounded-xl text-lg hover:bg-[#8bb8bb] transition"
              >
                Create Account
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
