
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiHome, FiPlusCircle, FiEdit2, FiTrash2, FiUsers, FiSearch, FiChevronRight, FiMail, FiLock } from "react-icons/fi";
import './Adminpanel.css';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editId, setEditId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    caption: '',
    message_id: '',
    quality: '',
    year: '',
    poster: '',
    genre: '',
    rating: ''
  });

  // In a real app, this would come from environment variables or backend
  const ADMIN_PASSWORD = "admin123"; // Change this to your desired password

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
    setPassword("");
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (["edit", "remove", "dashboard"].includes(activeTab)) {
          const res = await axios.get("https://watchly-leod.onrender.com/api/movies");
          setMovies(res.data);
        } else if (activeTab === "messages") {
          const res = await axios.get("https://watchly-leod.onrender.com/api/messages");
          setMessages(res.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab, isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("https://watchly-leod.onrender.com/api/movies/add", formData);
      alert("Movie added successfully!");
      setFormData({ caption: '', message_id: '', quality: '', year: '', poster: '', genre: '', rating: '' });
      const res = await axios.get("https://watchly-leod.onrender.com/api/movies");
      setMovies(res.data);
    } catch (err) {
      alert("Failed to add movie: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (movie) => {
    setFormData(movie);
    setEditId(movie._id);
    setActiveTab("editForm");
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`https://watchly-leod.onrender.com/api/movies/${editId}`, formData);
      alert("Movie updated successfully!");
      setActiveTab("edit");
      const res = await axios.get("https://watchly-leod.onrender.com/api/movies");
      setMovies(res.data);
    } catch (err) {
      alert("Failed to update movie: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setIsLoading(true);
      try {
        await axios.delete(`https://watchly-leod.onrender.com/api/movies/${id}`);
        setMovies(prev => prev.filter(m => m._id !== id));
        alert("Movie deleted successfully!");
      } catch (err) {
        alert("Failed to delete movie: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCheckbox = (id) => {
    setSelectedMovies(prev =>
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (selectedMovies.length === 0) return alert("No movies selected");
    if (!window.confirm(`Delete ${selectedMovies.length} selected movies?`)) return;

    setIsLoading(true);
    try {
      await Promise.all(
        selectedMovies.map(id => axios.delete(`https://watchly-leod.onrender.com/api/movies/${id}`))
      );
      setMovies(prev => prev.filter(m => !selectedMovies.includes(m._id)));
      setSelectedMovies([]);
      alert(`${selectedMovies.length} movies deleted successfully!`);
    } catch (err) {
      alert("Failed to delete movies: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMovies = movies.filter(m =>
    m.caption?.toLowerCase().includes(search.toLowerCase()) ||
    m.year?.toString().includes(search) ||
    m.genre?.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <FiLock className="lock-icon" />
            <h2>Admin Login</h2>
            <p>Please enter the admin password to continue</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2><span className="highlight">Watchly</span></h2>
          <p>Welcome, Admin!</p>
        </div>
        
        <div className="sidebar-menu">
          <div 
            className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FiHome className="icon" />
            <span>Dashboard</span>
            <FiChevronRight className="arrow" />
          </div>
          
          <div 
            className={`menu-item ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            <FiPlusCircle className="icon" />
            <span>Add Movie</span>
            <FiChevronRight className="arrow" />
          </div>
          
          <div 
            className={`menu-item ${activeTab === "edit" ? "active" : ""}`}
            onClick={() => setActiveTab("edit")}
          >
            <FiEdit2 className="icon" />
            <span>Edit Movies</span>
            <FiChevronRight className="arrow" />
          </div>
          
          <div 
            className={`menu-item ${activeTab === "remove" ? "active" : ""}`}
            onClick={() => setActiveTab("remove")}
          >
            <FiTrash2 className="icon" />
            <span>Remove Movies</span>
            <FiChevronRight className="arrow" />
          </div>
          
          <div 
            className={`menu-item ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            <FiMail className="icon" />
            <span>Messages</span>
            <FiChevronRight className="arrow" />
          </div>

          <div 
            className={`menu-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <FiUsers className="icon" />
            <span>Manage Users</span>
            <FiChevronRight className="arrow" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="dashboard">
            <h1 className="page-title">Admin Dashboard</h1>
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Total Movies</h3>
                <p>{movies.length}</p>
              </div>
              <div className="stat-card">
                <h3>Recent Additions</h3>
                <p>{movies.slice(0, 3).map(m => m.caption).join(", ")}</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Movie */}
        {activeTab === "add" && (
          <div className="form-container">
            <h1 className="page-title">Add New Movie</h1>
            <form onSubmit={handleAddMovie}>
              <div className="form-group">
                <label>Movie Title</label>
                <input
                  name="caption"
                  value={formData.caption}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Message ID</label>
                <input
                  name="message_id"
                  value={formData.message_id}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Quality</label>
                  <input
                    name="quality"
                    value={formData.quality}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Year</label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Poster URL</label>
                <input
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Genre</label>
                  <input
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Rating</label>
                  <input
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <button type="submit" className="primary-btn" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Movie"}
              </button>
            </form>
          </div>
        )}

        {/* Edit Movies */}
        {activeTab === "edit" && (
          <div className="list-container">
            <div className="page-header">
              <h1 className="page-title">Edit Movies</h1>
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="movie-list">
              {filteredMovies.length > 0 ? (
                filteredMovies.map(movie => (
                  <div key={movie._id} className="movie-item">
                    <div className="movie-info">
                      <h3>{movie.caption}</h3>
                      <p>{movie.year} • {movie.quality} • {movie.genre || "N/A"}</p>
                    </div>
                    <button 
                      onClick={() => handleEditClick(movie)}
                      className="edit-btn"
                    >
                      <FiEdit2 /> Edit
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No movies found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Form */}
        {activeTab === "editForm" && (
          <div className="form-container">
            <h1 className="page-title">Edit Movie</h1>
            <form onSubmit={handleUpdateMovie}>
              <div className="form-group">
                <label>Movie Title</label>
                <input
                  name="caption"
                  value={formData.caption}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Message ID</label>
                <input
                  name="message_id"
                  value={formData.message_id}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Quality</label>
                  <input
                    name="quality"
                    value={formData.quality}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Year</label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Poster URL</label>
                <input
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Genre</label>
                  <input
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Rating</label>
                  <input
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="secondary-btn"
                  onClick={() => setActiveTab("edit")}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Movie"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Remove Movies */}
        {activeTab === "remove" && (
          <div className="list-container">
            <div className="page-header">
              <h1 className="page-title">Remove Movies</h1>
              <div className="actions">
                <div className="search-box">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button 
                  onClick={deleteSelected} 
                  className="danger-btn"
                  disabled={selectedMovies.length === 0 || isLoading}
                >
                  <FiTrash2 /> Delete Selected ({selectedMovies.length})
                </button>
              </div>
            </div>
            
            <div className="movie-list">
              {filteredMovies.length > 0 ? (
                filteredMovies.map(movie => (
                  <div key={movie._id} className="movie-item">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedMovies.includes(movie._id)}
                        onChange={() => handleCheckbox(movie._id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div className="movie-info">
                      <h3>{movie.caption}</h3>
                      <p>{movie.year} • {movie.quality}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(movie._id)}
                      className="danger-btn small"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No movies found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div className="list-container">
            <h1 className="page-title">Contact Messages</h1>
            <div className="message-list">
              {messages.length > 0 ? (
                messages.map(message => (
                  <div key={message._id} className="message-card">
                    <div className="message-header">
                      <h3>{message.name}</h3>
                      <span>{message.email}</span>
                    </div>
                    <div className="message-content">
                      <p><strong>Subject:</strong> {message.subject || 'No subject'}</p>
                      <p><strong>Message:</strong> {message.message}</p>
                    </div>
                    <div className="message-footer">
                      <small>{new Date(message.createdAt).toLocaleString()}</small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No messages yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manage Users */}
        {activeTab === "users" && (
          <div className="users-container">
            <h1 className="page-title">User Management</h1>
            <div className="coming-soon">
              <p>This section will allow you to manage users in future updates.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
