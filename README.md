
# 🔐 Securofy – Financial Literacy & Fraud Awareness Platform

Securofy is a modern web-based platform focused on **financial literacy, scam detection, and cybersecurity awareness**.  
It helps users understand fraud techniques, simulate real-world scams, and interact with an AI-powered assistant for guidance.

---

## 🚀 Features

### 🧠 AI Chat Assistant
- Interactive chatbot for financial and cybersecurity guidance  
- Answers user queries related to scams, frauds, and safety  
- Voice + text interaction support  

### 🧪 Scam Simulation
- Real-world fraud scenario simulations  
- Helps users identify and avoid scams  
- Practical learning approach  

### 📊 Quiz System
- Multiple quizzes on:
  - Cybersecurity
  - Financial fraud
  - Awareness topics  
- Score tracking for learning progress  

### 🔐 Authentication System
- JWT-based authentication  
- Secure login & registration  
- Protected routes  

### 🌐 Modern UI
- Clean and responsive design  
- Smooth animations and user-friendly interface  

---

## 🏗️ Tech Stack

### Frontend
- React.js (TypeScript)
- Tailwind CSS
- Context API (Auth Management)

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST APIs

### Database
- MongoDB / Firebase (based on your setup)

### AI Integration
- OpenAI API (for chatbot functionality)

---

## 📂 Project Structure

```

SECUROFY/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── quiz.js
│   │   ├── simulate.js
│   │   └── user.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChatbot.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── ...
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   └── App.tsx
│   └── package.json

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/securofy.git
cd securofy
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

| Variable       | Description                   |
| -------------- | ----------------------------- |
| PORT           | Backend server port           |
| JWT_SECRET     | Secret key for authentication |
| OPENAI_API_KEY | AI chatbot API key            |

---

## 🔒 Security Features

* JWT-based authentication system
* Protected API routes
* Secure token handling
* Input validation

---

## 📸 Use Cases

* Learn about financial scams
* Practice identifying fraud
* Improve cybersecurity awareness
* Get AI-based guidance

---

## 🌟 Future Improvements

* Multi-language support 🌍
* Advanced AI fraud detection
* Real-time scam alerts
* Blockchain-based verification

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Gopal**
Full Stack AI Engineer | Mern Stack Developer

Just tell me 👍
```
