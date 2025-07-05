import { useState } from 'react'
import './App.css'

import React from "react";


function App() {
  return (
    <div className="container">
      <div className="left">
        <h1>HALO!</h1>
        <p>
          Selamat Datang
          di Website Kami.
        </p>
      </div>
      <div className="right">
        <h2>Login</h2>
        <form >
          <input type="text" placeholder="Nama" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
          <p className="login-text">
            Belum Punya Akun? <a href="#">Daftar </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
