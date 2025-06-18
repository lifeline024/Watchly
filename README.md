# 🎬 Watchly – Premium Movie Streaming Platform

Welcome to **Watchly**, a beautifully designed movie streaming platform built with modern tech, smooth animations, and a premium user interface.
<p align="center">
  <img src="https://videos.openai.com/vg-assets/assets%2Ftask_01jxy9zxncftptfajrgm891ypj%2F1750142612_img_0.webp?st=2025-06-18T09%3A38%3A10Z&se=2025-06-24T10%3A38%3A10Z&sks=b&skt=2025-06-18T09%3A38%3A10Z&ske=2025-06-24T10%3A38%3A10Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=DFGCDFT9AI4GM5lIa9iTc9Pwjh3kSShJnnumOBJ34iI%3D&az=oaivgprodscus" height="300" alt="Watchly Preview" />
</p>

---

## 🌟 Key Features

- 🎞️ **Stunning UI** with dark-glassmorphism design
- 🌀 **Advanced animations** using CSS, GSAP, and Framer Motion
- 📱 **Fully responsive** – mobile-first design
- 🔐 **User Authentication** with role-based access
- 📥 **Direct movie download** via Telegram bot integration
- 🧑‍💻 **Admin dashboard** to manage content and users
- ⚙️ **MongoDB storage** for movie metadata and user data
- ⚡ **Optimized performance** with lazy loading and route splitting

---

## 🎨 Color Palette

| Element        | Color Code   | Usage                        |
|----------------|--------------|------------------------------|
| Background     | `#0D0D0D`    | Main dark theme              |
| Highlight      | `#00FFF7`    | Neon cyan for active states |
| Gold Accent    | `#FFD700`    | Premium buttons/text glow   |
| Cards/Modals   | `#1A1A1A` + blur | Glassmorphic background |

---

## 💻 Tech Stack

**Frontend**  
- HTML, CSS, JavaScript (ES6+)
- React.js
- Framer Motion / GSAP for animations  
- Axios for API calls

**Backend**  
- Node.js + Express.js  
- MongoDB (Mongoose)  
- JWT Authentication

**Others**  
- Telegram Bot Integration (`/start slug`)  
- Render Dleployment  
- Lazy loading, route guards

---

## 🖼️ UI Highlights

- **Landing Page**: Hero section with animated gradient overlays
- **Movie Cards**: Hover to flip/expand with 3D effect
- **Modals**: Slide-in movie details with blurred backdrop
- **Transitions**: Smooth fade/slide using Framer Motion

---

## 🔐 Access Control

- **Guests** can view home but not access content
- **Registered Users** can view/download content
- **Admins** can upload, delete, and manage movies/users

---

## 🤖 Telegram Bot Link System

Each movie is mapped to a deep link:

