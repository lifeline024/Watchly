import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUser, FaEnvelope, FaCrown } from "react-icons/fa";

export default function ProfileDialog({ user, onClose }) {
  if (!user) return null; // Avoid rendering if user is undefined

  return (
    <AnimatePresence>
      <motion.div
        className="profile-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="profile-dialog"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
          
          <div className="profile-header">
            <div className="avatar-container">
              <div className="avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              {user?.premium && (
                <div className="premium-badge">
                  <FaCrown />
                </div>
              )}
            </div>
            <h2>{user?.name || "USER"}</h2>
            {user?.premium && <span className="premium-tag">Premium Member</span>}
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <FaUser className="detail-icon" />
              <div>
                <p className="detail-label">Username</p>
                <p className="detail-value">{user?.username || "N/A"}</p>
              </div>
            </div>
            
            <div className="detail-item">
              <FaEnvelope className="detail-icon" />
              <div>
                <p className="detail-label">Email</p>
                <p className="detail-value">{user?.email || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* <div className="profile-stats">
            <div className="stat-item">
              <p className="stat-value">42</p>
              <p className="stat-label">Movies Watched</p>
            </div>
            <div className="stat-item">
              <p className="stat-value">8.6</p>
              <p className="stat-label">Avg Rating</p>
            </div>
            <div className="stat-item">
              <p className="stat-value">18</p>
              <p className="stat-label">Watchlist</p>
            </div>
          </div> */}

          <button className="upgrade-button">
            Upgrade to Premium
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// CSS
const profileDialogStyles = `
.profile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  padding: 1rem;
}

.profile-dialog {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
}

.close-button:hover {
  color: #e94560;
  transform: rotate(90deg);
  background: rgba(255, 255, 255, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e94560, #ff7b54);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto;
}

.premium-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #8a6d00;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border: 2px solid #1a1a2e;
}

.profile-header h2 {
  color: white;
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

.premium-tag {
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #8a6d00;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: bold;
  display: inline-block;
}

.profile-details {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-icon {
  color: #e94560;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.detail-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin: 0;
}

.detail-value {
  color: white;
  font-size: 1rem;
  margin: 0.2rem 0 0;
  font-weight: 500;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, #e94560, #ff7b54);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.7rem;
  margin: 0.3rem 0 0;
}

.upgrade-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #8a6d00;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.upgrade-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = profileDialogStyles;
document.head.appendChild(styleElement);
