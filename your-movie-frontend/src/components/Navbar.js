import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Correct hook for navigation

export default function Navbar({ onFilter, user, onLogout, onProfile }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // ✅ use navigate here

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onFilter({ search });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, onFilter]);

  const onRequest = () => {
    navigate("/request");
  };
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-brand">
          <FaFilm className="navbar-logo" />
          <span className="navbar-title">Watchly</span>
           <button onClick={onRequest} className="request-button">
             <FaFilm />
             Request Movie
              </button>
        </div>

        {user && (
          <div className="navbar-actions">
            
            <button onClick={onProfile} className="profile-button">
              <FaUserCircle />
              {user.username || "Profile"}
            </button>
            <button onClick={onLogout} className="logout-button">
              <FaSignOutAlt />
            </button>
          </div>
        )}
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
    </nav>
  );
}


// CSS
const navbarStyles = `
.navbar {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem 1.5rem;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.navbar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.navbar-logo {
  font-size: 1.8rem;
  color: #e94560;
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #e94560, #ff7b54);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-search {
  width: 90%;
}

.search-input {
  width: 100%;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 70px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: white;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 2px rgba(233, 69, 96, 0.5);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.profile-button, .logout-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.profile-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(5px);
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.logout-button {
  background: rgba(233, 69, 96, 0.2);
  color: #e94560;
}

.logout-button:hover {
  background: rgba(233, 69, 96, 0.3);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .navbar-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .navbar-actions {
    width: 100%;
    justify-content: space-between;

  }

  .search-input {
    font-size: 1.2rem;
  }
}

.request-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px;
  border: none;
  color: #ffffff;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  box-shadow: 0 8px 16px rgba(255, 75, 43, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.request-button::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%);
  transform: rotate(45deg);
  transition: opacity 0.5s;
  pointer-events: none;
}

.request-button:hover {
  background: linear-gradient(135deg, #ff4b2b, #ff416c);
  box-shadow: 0 10px 20px rgba(255, 75, 43, 0.5);
  transform: translateY(-2px);
}

.request-button:active {
  transform: scale(0.98);
  box-shadow: 0 4px 10px rgba(255, 75, 43, 0.3);
}

.request-button svg {
  font-size: 18px;
  color: #ffffff;
}


`;

// Add styles to document
const styleElement = document.createElement('style');
styleElement.innerHTML = navbarStyles;
document.head.appendChild(styleElement);