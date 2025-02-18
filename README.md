# Chat Application (FullStack MERN)

## 📌 Overview
This is a **real-time chat application** built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with **Socket.io** for real-time messaging. The app supports **one-on-one messaging** and authentication to ensure a secure user experience.

## ✨ Features
- 🔐 **User Authentication** (Sign Up, Login, JWT-based Authentication)
- 💬 **Real-time Private Chat** (Instant messaging with WebSockets)
- 🗂️ **User Search** (Find and start conversations with other users)
- 🖼️ **Profile Management** (User can update their profile details)
- 🌐 **Responsive UI** (Optimized for all screen sizes using Tailwind CSS)
- 🔔 **Notification System** (Real-time message notifications)
- 📝 **Message Persistence** (Chats are stored in MongoDB for later retrieval)

## 🏗️ Architecture
This application follows a **client-server architecture**, where:
- The **frontend (React.js)** handles the user interface and communicates with the backend via REST APIs and WebSockets.
- The **backend (Node.js & Express.js)** manages authentication, messaging, and data storage.
- **MongoDB** is used as the primary database to store user details and messages.
- **Socket.io** is used for real-time bidirectional communication between clients.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT
- **Real-time Communication:** Socket.io
- **Authentication:** JSON Web Token (JWT), bcrypt.js
- **Database:** MongoDB (Mongoose ODM)

## 🚀 Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- MongoDB (local or Atlas instance)

### Steps to Run Locally
#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Abhishek-G06/Chat-Applicaton-FullStack-MERN.git
cd Chat-Applicaton-FullStack-MERN
```
#### 2️⃣ Install Dependencies
```sh
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```
#### 3️⃣ Setup Environment Variables
Create a `.env` file in the `backend` directory with the following:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SOCKET_PORT=5000
```
#### 4️⃣ Start the Application
```sh
# Start backend server
cd backend
npm start

# Start frontend
cd ../frontend
npm start
```
#### 5️⃣ Open the App
Visit `http://localhost:3000` in your browser.

## 📷 Screenshots
![Chat UI Screenshot](link-to-your-screenshot)

## 🔄 API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and return token

### Messaging
- `GET /api/messages/:userId` - Fetch messages with a specific user
- `POST /api/messages/send` - Send a new message

### Users
- `GET /api/users` - Fetch all registered users
- `GET /api/users/:id` - Fetch a specific user by ID

## 📌 Future Enhancements
- ✅ Implement **Group Chat** functionality
- ✅ Add **Media Sharing** (Images, Documents)
- ✅ Improve **User Status** (Online/Offline Indicators)
- ✅ Implement **Typing Indicators**

## 🏆 Contributing
We welcome contributions! If you'd like to improve this project, follow these steps:
1. Fork the repository.
2. Create a new feature branch.
3. Make your changes and commit them.
4. Push your changes to the branch.
5. Create a pull request.

## 📝 License
This project is open-source and available under the **MIT License**.

## ✉️ Contact
For any inquiries or suggestions, feel free to reach out!
- 📧 Email: abhi2002gupta@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/abhishek-gupta-667229189/)
- 🏆 GitHub: [Abhishek-G06](https://github.com/Abhishek-G06)

---
🙌 **Feel free to contribute!** If you find any issues or have ideas for improvements, create a pull request or open an issue. 🚀

