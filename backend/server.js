import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import quizRoutes from './routes/quiz.js';
import chatRoutes from './routes/chat.js';
import simulateRoutes from './routes/simulate.js';

dotenv.config();

const app = express();
app.set("trust proxy", 1);

const httpServer = createServer(app);

// ================= ALLOWED ORIGINS =================
const allowedOrigins = [
  "http://localhost:5173",
  "https://securofy.vercel.app"
];

// ================= SOCKET.IO =================
const io = new Server(httpServer, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Socket CORS not allowed"));
      }
    },
    credentials: true,
  },
});

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= FIXED CORS =================
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// ================= SOCKET HANDLER =================
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('join_user_room', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// ================= ROUTES =================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/simulate', simulateRoutes);

// ================= HEALTH CHECK =================
app.get('/', (req, res) => {
  res.send('Securofy API is running 🚀');
});

// ================= DB + SERVER =================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    httpServer.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));