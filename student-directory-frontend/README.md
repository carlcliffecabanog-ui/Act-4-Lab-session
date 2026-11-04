# Student Directory – React Authentication

## Project Description
Student Directory is a React application connected to an Express and MongoDB backend. It allows users to register, log in, view student records, and log out securely using JWT authentication.

## Features
- User registration
- User login
- JWT authentication
- Protected student directory
- Student data fetching
- Logout functionality
- React Router navigation

## Technologies Used
- React
- Vite
- React Router DOM
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)

## Installation and Setup

### 1. Install dependencies
Open the backend and frontend folders in separate terminals.

For the backend:
```bash
npm install
```

For the frontend:
```bash
cd student-directory-frontend
npm install
npm install react-router-dom
```

### 2. Environment Variables
Create a `.env` file in the backend folder with these variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not upload your actual `.env` file to GitHub.

### 3. Start the Backend
From the backend folder, run:

```bash
node server.js
```

The backend runs on:
`http://localhost:3000`

### 4. Start the Frontend
From the frontend folder, run:

```bash
npm run dev
```

Open:
`http://localhost:5173`

## Reflection Questions

### 1. Why do we store the token in localStorage? What is one security risk, and what is a more secure alternative?
We store the token in localStorage so the user can remain logged in even after refreshing the page. One security risk is that malicious JavaScript can access the token during a cross-site scripting attack. A more secure alternative is using an HttpOnly, Secure cookie.

### 2. What is the purpose of AuthContext? Why not just pass the token as a prop?
AuthContext manages authentication information for the entire application. It allows different components to access the user and token easily. Without it, we would need to pass the token through many components using props, which can make the code complicated.

### 3. What happens on the frontend when the JWT expires?
When the JWT expires, the backend rejects protected requests with an unauthorized response. The frontend should detect this response, clear the expired token, and redirect the user to the login page. The application should also display a message asking the user to log in again.

### 4. What is the difference between requireAuth middleware and ProtectedRoute?
The backend requireAuth middleware checks whether an API request has a valid JWT before allowing access to protected data. The frontend ProtectedRoute checks whether a user is logged in before displaying a protected page. We need both because frontend protection controls page navigation, while backend protection secures the actual data.
