# 📝 Blog Application — Modern Full-Stack Blogging Platform
A full-stack blogging platform built with the MERN stack, featuring real-time updates, rich text editing, and comprehensive post management capabilities.  
Users can create, edit, and delete posts, interact with content through likes and comments, bookmark favorite posts, and filter content to discover what matters most.  
The app uses Socket.IO for real-time updates, JWT for secure authentication, and Chakra UI + Tailwind CSS for a modern, responsive interface.

---

## 🚀 Features

### 📄 Content Management
- Create blog posts with a rich text editor  
- Edit your existing posts anytime  
- Delete posts you no longer want published  
- Format content with advanced editing capabilities  
- Upload and manage images via **Cloudinary**

### 💬 Social Interactions
- Like posts to show appreciation  
- Comment system for engaging discussions  
- Real-time updates using **Socket.IO**  
- See likes and comments appear instantly  
- Bookmark posts to read later

### 🔍 Content Discovery
- Filter posts by categories, tags, or criteria  
- Browse community feed  
- Discover trending content  
- Personalized content recommendations

### 🎨 User Experience
- Fully responsive design for all devices  
- Modern, clean UI with **Chakra UI**  
- Smooth animations and transitions  
- Fast page loads and optimized performance

### 🔐 Authentication & Security
- Secure JWT-based authentication  
- httpOnly cookies preventing XSS attacks  
- Password hashing for secure storage  
- Access and refresh token system  
- Protected routes and user sessions

---

## 🧰 Tech Stack

### 🖥️ Frontend
- ⚛️ React.js  
- 🌈 Chakra UI  
- 🎨 Tailwind CSS  
- 📝 Rich Text Editor  
- ⚡ Socket.IO Client  
- 🖼️ Cloudinary (Image Management)

### 🏗️ Backend
- 🟢 Node.js  
- 🚂 Express.js  
- ⚡ Socket.IO (Real-time Communication)  
- 🔑 JWT (JSON Web Tokens)  
- ☁️ Cloudinary (Cloud Storage)

### 🗄️ Database
- 🍃 MongoDB

### 🔧 Other Tools
- 🐙 Git & GitHub  
- 🚀 Deployment Platform

---

## 📦 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/bikash-kumar-kc/blogify.git
```

### 2. Navigate to the project folders:

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

### 3. Add Environment Variables:

Create a `.env` file in the **backend** directory:
```bash
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

Create a `.env` file in the **frontend** directory:
```bash
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the development servers:

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:8000`

---

## 🔗 Usage

- Sign up or log in to access the platform
- Create a new post using the rich text editor
- Upload images to enhance your content
- Like, comment, and bookmark posts from other users
- Use filters to find posts that interest you
- Edit or delete your own posts anytime
- Experience real-time updates as interactions happen
- Manage your profile and account settings

---

## 🔒 Security Features

- **httpOnly Cookies** — Secure token storage preventing XSS attacks
- **JWT Authentication** — Stateless authentication with access and refresh tokens
- **CORS Protection** — Configured cross-origin resource sharing
- **Password Hashing** — Bcrypt encryption for secure password storage
- **Input Validation** — Server-side validation of all user inputs
- **Protected Routes** — Authorization middleware for secure endpoints

---

## 📄 License

This project is licensed under the MIT License.

---

**🌐 Deployed Application**: [Your Live URL]
