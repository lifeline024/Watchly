import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [responseMsg, setResponseMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('https://watchly-leod.onrender.com/api/contact', formData);
      setResponseMsg({ text: res.data.message, type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setResponseMsg({ text: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '40px',
    borderRadius: '16px',
    backgroundColor: '#1e1e2f',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#e0e0ff',
  };

  const headerStyle = {
    fontSize: '2.8rem',
    fontWeight: '700',
    marginBottom: '30px',
    textAlign: 'center',
    letterSpacing: '1.5px',
    color: '#a2aaff',
    textShadow: '0 2px 6px #5555ff88',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#bbc2ff',
    userSelect: 'none',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '12px',
    border: '1.5px solid #44477a',
    backgroundColor: '#2a2a47',
    color: '#d8d8ff',
    fontSize: '1rem',
    marginBottom: '24px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#7f88ff',
    boxShadow: '0 0 8px 2px #7f88ff77',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '140px',
    resize: 'vertical',
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '14px',
    border: 'none',
    backgroundColor: '#5c6bc0',
    color: '#e0e0ff',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    boxShadow: '0 6px 16px rgba(92, 107, 192, 0.6)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#7c8aff',
    boxShadow: '0 8px 20px rgba(124, 138, 255, 0.8)',
  };

  const responseStyle = {
    marginTop: '26px',
    padding: '16px',
    borderRadius: '12px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '1.1rem',
    backgroundColor: responseMsg.type === 'success' ? '#263d27' : '#4a1f22',
    color: responseMsg.type === 'success' ? '#b9f6ca' : '#ff8a8a',
    border: responseMsg.type === 'success' ? '1px solid #4caf50' : '1px solid #ff5252',
    boxShadow: responseMsg.type === 'success'
      ? '0 0 12px 2px #4caf5022'
      : '0 0 12px 2px #ff525222',
  };

  // For managing input focus styling (optional enhancement)
  const [focusedInput, setFocusedInput] = React.useState(null);

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Get Your Fav Movie</h2>
     <h2 style={{ textAlign: 'center', fontSize: '1.2rem', color: '#a2aaff' }}>
  <a href="https://t.me/learningpoint024" target="_blank" rel="noopener noreferrer" class="telegram-btn">
  <i class="fab fa-telegram-plane"></i> Connect with Us for Free E-Notes
</a>
</h2>

      <form onSubmit={handleSubmit} noValidate>
        {['name', 'email', 'subject'].map((field) => (
          <div key={field}>
            <label style={labelStyle} htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              name={field}
              placeholder={`Enter your ${field}`}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(focusedInput === field ? inputFocusStyle : {}),
              }}
              onFocus={() => setFocusedInput(field)}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
        ))}

        <div>
          <label style={labelStyle} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              ...textareaStyle,
              ...(focusedInput === 'message' ? inputFocusStyle : {}),
            }}
            onFocus={() => setFocusedInput('message')}
            onBlur={() => setFocusedInput(null)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...buttonStyle,
            ...(isSubmitting ? { backgroundColor: '#8a8a8a', boxShadow: 'none', cursor: 'not-allowed' } : {}),
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              Object.assign(e.target.style, buttonHoverStyle);
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              Object.assign(e.target.style, buttonStyle);
            }
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {responseMsg && (
          <div style={responseStyle}>
            {responseMsg.text}
          </div>
        )}
      </form>
    </div>
  );
}
<style jsx>{`
.telegram-btn {
  display: inline-block;
  background-color: #0088cc;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}
.telegram-btn:hover {
  background-color: #006999;
}
.telegram-btn i {
  margin-right: 8px;
}
 ` }
</style>
