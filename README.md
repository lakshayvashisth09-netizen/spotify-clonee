# 🎧 Spotify Clone (Full Stack)

A full-stack Spotify-inspired music streaming application built using MERN stack with real-time features and authentication.

---

## 🚀 Live Demo
[https://your-vercel-link.vercel.app](https://spotify-clonee-ten.vercel.app/)

---

## ⚙️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Zustand (State Management)
- Clerk Authentication
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io

### Cloud & Tools
- Cloudinary (media storage)
- Vercel (deployment)

---

## ✨ Features

- Google Authentication (Clerk)
- Music Player with controls
- Playlist system
- Like songs
- Real-time friend activity
- Chat system
- Responsive layout
- Admin upload support

---

## 🔐 Authentication Flow

1. User logs in via Clerk
2. Clerk provides JWT token
3. Token sent via Axios headers
4. Backend verifies user
5. User synced into MongoDB

---

## 🧠 Architecture

Frontend → Axios → Express API → MongoDB  
                     ↘ Socket.io (Realtime updates)

---

## 📂 Project Structure
