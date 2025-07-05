import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/Profile";

function App() {
  // Simulasi login (ganti dengan logic auth asli jika sudah ada backend)
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLogin ? <Navigate to="/profile" /> : <Login setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={isLogin ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
