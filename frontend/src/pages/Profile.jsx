import React, { useState } from "react";

function Profile() {
  // Data statis contoh
  const [profile, setProfile] = useState({
    nama: "Resya Anggara",
    email: "resyaanggara98@gmail.com",
    username: "resya123",
    bio: "Halo, saya Resya!",
  });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(form);
    setEdit(false);
  };

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
