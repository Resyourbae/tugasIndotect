import React, { useState, useEffect } from "react";
import { API_URL } from "../api";

function Profile() {
  const [profile, setProfile] = useState({
    nama: "",
    email: "",
    username: "",
    bio: "",
  });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    // Ambil username dari localStorage (set di login)
    const username = localStorage.getItem("username");
    if (!username) {
      setError("Tidak ada username ditemukan.");
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/user/profile?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setProfile({
            nama: data.nama,
            email: data.email,
            username: data.username,
            bio: data.bio,
          });
          setForm({
            nama: data.nama,
            email: data.email,
            username: data.username,
            bio: data.bio,
          });
        } else {
          setError(data.error || "Gagal mengambil data profil.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal terhubung ke server.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      //GANTI URL NYA SETIAP KALI RESTART HOSTING NGROK
      const res = await fetch("http://localhost:5000/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          nama: form.nama,
          bio: form.bio,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(form);
        setEdit(false);
      } else {
        alert(data.error || "Gagal update profil.");
      }
    } catch {
      alert("Gagal terhubung ke server.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#a8d0d3]">
        <div className="text-xl text-black">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#a8d0d3]">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a8d0d3]">
      <div className="w-full max-w-xl bg-white rounded-[30px] shadow-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">Profile</h2>
        {!edit ? (
          <div className="space-y-6">
            <div>
              <span className="block text-gray-600">Nama</span>
              <span className="block text-xl font-bold">{profile.nama}</span>
            </div>
            <div>
              <span className="block text-gray-600">Email</span>
              <span className="block text-xl font-bold">{profile.email}</span>
            </div>
            <div>
              <span className="block text-gray-600">Username</span>
              <span className="block text-xl font-bold">{profile.username}</span>
            </div>
            <div>
              <span className="block text-gray-600">Bio</span>
              <span className="block text-xl font-bold">{profile.bio}</span>
            </div>
            <button
              className="w-full bg-[#a8d0d3] text-white font-bold py-3 rounded-xl text-lg hover:bg-[#8bb8bb] transition mt-4"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSave}>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama"
              className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
              required
            />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none"
              required
              disabled
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full px-4 py-3 bg-[#393939] text-white font-bold border-none rounded focus:outline-none resize-none"
              rows={3}
            />
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-[#a8d0d3] text-white font-bold py-3 rounded-xl text-lg hover:bg-[#8bb8bb] transition"
              >
                Simpan
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 rounded-xl text-lg hover:bg-gray-400 transition"
                onClick={() => { setEdit(false); setForm(profile); }}
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;