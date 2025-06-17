import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MovieDialog({ movie, onClose }) {
  const [isCopying, setIsCopying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = () => {
    setIsCopying(true);
    const telegramLink = `https://t.me/MovieTypeBot?start=${movie.message_id}`;
    
    navigator.clipboard
      .writeText(`/start ${movie.slug || movie.message_id}`)
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsCopying(false);
          window.open(telegramLink, "_blank");
        }, 2000);
      })
      .catch(() => {
        alert("⚠️ Please copy manually: /start " + (movie.slug || movie.message_id));
        setIsCopying(false);
        window.open(telegramLink, "_blank");
      });
  };

  return (
    <motion.div 
      className="dialog-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="movie-dialog"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <button className="close-btn" onClick={onClose}>
          <motion.span whileHover={{ rotate: 90 }}>✖</motion.span>
        </button>

        <div className="dialog-content">
          <motion.div 
            className="poster-wrapper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={movie.poster || "https://via.placeholder.com/700x400?text=No+Image"}
              alt={movie.title || "Movie Poster"}
              className="dialog-poster"
            />
          </motion.div>

          <div className="dialog-info">
            <motion.h2 
              className="dialog-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {movie.title || movie.caption || "Untitled Movie"}
            </motion.h2>
            
            <motion.p 
              className="dialog-genre"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <strong>Genre:</strong> {movie.genre || "Unknown"}
            </motion.p>
            
            <motion.p 
              className="dialog-description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {movie.description || "No description available."}
            </motion.p>

            <AnimatePresence>
              {showSuccess ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring" }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 0.5,
                      times: [0, 0.25, 0.5, 1]
                    }}
                  >
                    
                  </motion.div>
                  <div>Opening Movie...</div>
                </motion.div>
              ) : (
                <motion.button 
                  className="download-btn"
                  onClick={handleDownload}
                  disabled={isCopying}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {isCopying ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                      }}
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    "📲 Download"
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style>{`
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
          backdrop-filter: blur(8px);
        }

        .movie-dialog {
          background: linear-gradient(145deg, #1e1e2f, #2a2a3a);
          border-radius: 16px;
          width: 100%;
          max-width: 800px;
          color: white;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          margin-right:2rem;
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 20px;
          background: rgba(255,255,255,0.1);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 1.2rem;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .dialog-content {
          display: flex;
          flex-direction: row;
          gap: 2.5rem;
          padding: 2rem;
          align-items: center;
          // margin-right: 3.5rem;
        }

        .poster-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }

        .dialog-poster {
          width: 100%;
          max-width: 300px;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .poster-wrapper:hover .dialog-poster {
          transform: scale(1.03);
        }

        .dialog-info {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .dialog-title {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #00aced, #0088cc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .dialog-genre {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 0.5rem;
        }

        .dialog-description {
          font-size: 0.95rem;
          color: #bbb;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .download-btn {
          background: linear-gradient(45deg, #0088cc, #005f8d);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          box-shadow: 0 4px 15px rgba(0, 136, 204, 0.3);
        }

        .download-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .download-btn:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(0, 136, 204, 0.4);
        }

        .success-message {
          background: rgba(0, 200, 83, 0.2);
          border: 1px solid rgba(0, 200, 83, 0.4);
          color: #00c853;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        /* ✅ Responsive for Phones */
        @media (max-width: 768px) {
          .dialog-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 1.5rem;
          }

          .poster-wrapper {
            max-width: 100%;
          }

          .dialog-poster {
            max-width: 90%;
          }

          .dialog-title {
            font-size: 1.5rem;
          }

          .download-btn {
            width: 100%;
            max-width: 250px;
            margin: 0 auto;
          }
        }
      `}</style>
    </motion.div>
  );
}