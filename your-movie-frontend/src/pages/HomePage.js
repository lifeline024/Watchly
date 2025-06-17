import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import MovieDialog from "../components/MovieDialog";
import AuthOverlay from "../components/AuthOverlay";
import ProfileDialog from "../components/ProfileDialog";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://watchly-leod.onrender.com/api/movies")
      .then((res) => {
        setMovies(res.data);
        setFilteredMovies(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies", err);
        setIsLoading(false);
      });

    const userInfo = localStorage.getItem("user");
    if (userInfo) setUser(JSON.parse(userInfo));
  }, []);

  const handleFilter = ({ search }) => {
    const filtered = movies.filter((movie) => {
      const caption = movie.caption?.toLowerCase() || "";
      return search ? caption.includes(search.toLowerCase()) : true;
    });
    setFilteredMovies(filtered);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="home-container">
      <Navbar onFilter={handleFilter} user={user} onLogout={handleLogout} onProfile={() => setShowProfile(true)} />
      
      <main className="movie-grid-container">
        {isLoading ? (
          <div className="loading-skeleton-grid">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="movie-card-skeleton"></div>
            ))}
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="not-found-container">
            <h2 className="not-found-title">404 Movies Not Found</h2>
            <p className="not-found-message">We couldn't find any movies matching your search</p>
            <img 
              src="https://i.imgur.com/A040Lxr.png" 
              alt="No movies found" 
              className="not-found-image"
            />
          </div>
        ) : (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onClick={() => setSelectedMovie(movie)} />
            ))}
          </div>
        )}
      </main>

      {selectedMovie && (
        <MovieDialog movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      {!user && <AuthOverlay onLogin={handleLogin} />}

      {showProfile && user && (
        <ProfileDialog user={user} onClose={() => setShowProfile(false)} />
      )}

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
          color: white;
        }

        .movie-grid-container {
          padding: 2rem;
          min-height: 70vh;
        }

        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
          justify-content: center;
          color:red;
        }

        .loading-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .movie-card-skeleton {
          background: linear-gradient(90deg, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%);
          background-size: 200% 100%;
          border-radius: 10px;
          height: 350px;
          animation: shimmer 1.5s infinite;
          color:red;
        }

        .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          gap: 1rem;
        }

        .not-found-title {
          font-size: 2rem;
          color: red;
          margin-bottom: 0.5rem;
        }

        .not-found-message {
          font-size: 1.2rem;
          color: #aaa;
        }

        .not-found-image {
          max-width: 400px;
          width: 100%;
          margin-top: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @media (max-width: 600px) {
          .movie-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .loading-skeleton-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .not-found-title {
            font-size: 1.5rem;
          }

          .not-found-message {
            font-size: 1rem;
          }

          .not-found-image {
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}
