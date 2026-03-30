import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

import './config/passport.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import quizRoutes from './routes/quiz.js';
import chatRoutes from './routes/chat.js';
import simulateRoutes from './routes/simulate.js';

dotenv.config();

const app = express();
app.set("trust proxy", 1); // ✅ REQUIRED for Render (cookies + HTTPS)

const httpServer = createServer(app);


// ================= SOCKET.IO =================
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});


// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ✅ FIXED CORS (VERY IMPORTANT)
app.use(
  cors({
    origin: process.env.CLIENT_URL, // ❌ no localhost fallback
    credentials: true,
  })
);


// ================= SESSION =================
app.use(
  session({
    name: "securofy_session",
    secret: process.env.SESSION_SECRET || 'super_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,        // 🔥 HTTPS required
      httpOnly: true,
      sameSite: 'none',    // 🔥 cross-origin fix
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());


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