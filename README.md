# NeBlog - MERN Stack Blogging Platform

NeBlog is a modern, full-stack blogging platform built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. It features a beautiful, responsive UI and a robust backend for creating, editing, and viewing blog posts.

## Features

- User authentication (register, login, logout)
- Create, edit, and delete blog posts with images
- Add categories to posts
- Comment on posts
- User profile and personal blog management
- Responsive, modern UI with gradient accents
- Search functionality for posts
- Secure API with JWT authentication

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, Tailwind CSS, React Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer (for image uploads), JWT, CORS

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── Pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── images/             # Uploaded images
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository
```
git clone <repo-url>
cd blog-app
```

### 2. Install dependencies
```
cd client
npm install
cd ../server
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `server/` directory:
```
MONGO_URL=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=<your-secret>
```

### 4. Start the backend
```
cd server
npm run dev
```

### 5. Start the frontend
```
cd client
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:5000](http://localhost:5000).

## Usage
- Register a new account or login.
- Create, edit, and delete your own blog posts.
- Upload images to posts.
- Add categories to organize your posts.
- Comment on any post.
- View your profile and your blogs.
- Use the search bar to find posts by title.

## UI/UX
- Modern, clean, and responsive design
- Gradient-accented navbar and footer
- Rounded cards and buttons
- Consistent color palette (cyan/blue/white)
- Mobile-friendly navigation and menus

## Customization
- Update categories in `CreatePost.jsx` as needed.
- Tailwind CSS is used for all styling—customize in `tailwind.config.js`.

## Screenshots
![image](https://github.com/user-attachments/assets/212c2421-7023-47e0-8d47-75662794c922)
![image](https://github.com/user-attachments/assets/3bc20f9f-fc4c-4fbc-9cfe-22a860e853fc)
![image](https://github.com/user-attachments/assets/db4b72f8-4c66-4247-9ca3-6010105aadc5)


---

**Made with ❤️ using the MERN stack by Nebert.**
