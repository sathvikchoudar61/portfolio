# Auction System

A full-stack web application designed for online auctions, featuring secure user authentication, real-time product listings, and integrated payment processing.

## 🚀 Features

- **User Authentication**: Secure Signup and Login using JWT (JSON Web Tokens) with email verification.
- **Product Management**: Browse and view auction items.
- **Real-time Bidding**: (Inferred capability based on Socket.io) Real-time updates for auctions.
- **Secure Payments**: Wallet integration and payment processing using **Razorpay**.
- **Email Notifications**: Automated emails for welcome messages and password resets using **Nodemailer**.
- **Responsive Design**: Modern, responsive UI built with **React** and **Tailwind CSS**.
- **Image Uploads**: Optimized image storage using **Cloudinary**.

## 🛠️ Tech Stack

### Frontend
- **React**: UI Library (Vite build tool)
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: State Management
- **Axios**: HTTP Client
- **Framer Motion**: Animations
- **React Router**: Navigation

### Backend
- **Node.js & Express**: Server-side runtime and framework
- **MongoDB & Mongoose**: Database and Object Data Modeling (ODM)
- **Socket.io**: Real-time bidirectional communication
- **Nodemailer**: Email sending service
- **Multer**: Middleware for handling `multipart/form-data` (file uploads)

### External Services
- **Cloudinary**: Cloud image management
- **Razorpay**: Payment gateway
- **Mailtrap**: Email testing (recommended for development)

## 📋 Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)

## ⚙️ Environment Variables

Create a `.env` file in the **root** directory and configure the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (Payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Service (Nodemailer)
EMAIL_USER=your_email_address_or_mailtrap_user
EMAIL_PASS=your_email_password_or_mailtrap_pass
```

> **Note**: For the frontend, check `frontend/.env` if additional environment variables (like API base URLs) are required.

## 📦 Installation

This project is organized with the backend in the root and frontend in a subdirectory.

### 1. Backend Setup
Install dependencies in the root directory:
```bash
npm install
```

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

## 🚀 Running the Application

You need to run both the backend and frontend servers.

### Start Backend
From the root directory:
```bash
npm run dev
```
*This runs the server using `nodemon` at `http://localhost:5000` (or your configured PORT).*

### Start Frontend
Open a new terminal, navigate to the frontend folder, and start the Vite server:
```bash
cd frontend
npm run dev
```
*The frontend will typically run at `http://localhost:5173`.*

## 📂 Project Structure

```
Auction_System/
├── backend/            # Backend source code
│   ├── controllers/    # Request handlers
│   ├── db/             # Database connection
│   ├── mailer/         # Email templates and sender logic
│   ├── middleware/     # Auth and error handling middleware
│   ├── models/         # Mongoose models (User, Product, etc.)
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/           # Frontend source code (Vite + React)
│   ├── src/            # React components and logic
│   └── package.json    # Frontend dependencies
├── package.json        # Backend dependencies & scripts
└── README.md           # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.
