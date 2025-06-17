import React from "react";
import { FaStar, FaPlayCircle } from "react-icons/fa";

export default function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster-container">
        <img
          src={movie.poster || "https://via.placeholder.com/300x450?text=No+Poster"}
          alt={movie.caption || "Movie poster"}
          className="movie-poster"
        />
        <div className="movie-overlay">
          <FaPlayCircle className="play-icon" />
        </div>
        {movie.rating && (
          <div className="movie-rating">
            <FaStar className="star-icon" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title" style={{ color: "red" }}>
  {movie.title || movie.caption || "Untitled Movie"}
</h3>

        // <p className="movie-genre">{movie.genre || "Unknown Genre"}</p>
      </div>
    </div>
  );
}

// CSS
const movieCardStyles = `
.movie-card {
  background: #1a1a2e;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.movie-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.movie-poster-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-card:hover .movie-poster {
  transform: scale(1.1);
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .movie-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.movie-card:hover .play-icon {
  color: #e94560;
  transform: scale(1.1);
}

// .movie-rating {
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: rgba(0, 0, 0, 0.7);
//   padding: 0.3rem 0.6rem;
//   border-radius: 20px;
//   display: flex;
//   align-items: center;
//   gap: 0.3rem;
//   font-size: 0.9rem;
//   font-weight: 600;
// }

.star-icon {
  color: #ffd700;
  font-size: 0.8rem;
}

.movie-info {
  padding: 1rem;
  color:red;
}

.movie-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #fff; /* white color for visibility */
  background: transparent;
  white-space: normal;
  overflow: visible;
}


.movie-genre {
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  color: #a1a1a1;
}
`;

// Add styles to document
const movieCardStyleElement = document.createElement('style');
movieCardStyleElement.innerHTML = movieCardStyles;
document.head.appendChild(movieCardStyleElement);
