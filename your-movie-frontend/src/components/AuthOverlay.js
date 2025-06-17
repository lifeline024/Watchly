import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AuthOverlay.css"; // Your CSS for styling and animation

export default function AuthOverlay({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [movieBackdrop, setMovieBackdrop] = useState("");

  // Animation & backdrop logic
  useEffect(() => {
    const backdrops = [
      "https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg",
      "https://image.tmdb.org/t/p/original/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg"
    ];
    setMovieBackdrop(backdrops[Math.floor(Math.random() * backdrops.length)]);

    const timer = setTimeout(() => setShowForm(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint = isLogin
    ? "http://localhost:5000/api/auth/login"
    : "http://localhost:5000/api/auth/signup";

  try {
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    const res = await axios.post(endpoint, payload);

    const user = res.data?.user;
    const token = res.data?.token;

    // ✅ For login, store token and user, then call onLogin
    if (isLogin) {
      if (!user || !token) throw new Error("Invalid login response");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
    } else {
      // ✅ For signup, show success and switch to login form
      alert("Signup successful! You can now login.");
      setIsLogin(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        mobile: ""
      });
    }
  } catch (err) {
    console.error("Auth Error:", err);
    alert(err.response?.data?.error || err.message || "Authentication failed.");
  }
};

  return (
    <div className="auth-overlay">
      {/* Backdrop */}
      <div
        className="movie-backdrop"
        style={{ backgroundImage: `url(${movieBackdrop})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      {/* Animated Title */}
      {!showForm && (
        <div className="title-animation">
          {"Watchly".split("").map((letter, index) => (
            <span key={index} className="letter">{letter}</span>
          ))}
        </div>
      )}

      {/* Auth Form */}
      {showForm && (
        <div className="form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="form-title">{isLogin ? "Login" : "Sign Up"}</h2>

            {!isLogin && (
              <>
                <input
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <input
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              minLength="6"
            />

            <button type="submit" className="submit-button">
              {isLogin ? "Login" : "Register"}
            </button>

            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
              <span onClick={toggleForm} className="toggle-link">
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
