import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Keep this import so that passport logic executes
import './config/passport.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import quizRoutes from './routes/quiz.js';
import chatRoutes from './routes/chat.js';
import simulateRoutes from './routes/simulate.js';

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'securofy_super_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Store io in req to use it in routes for real-time updates
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  // Authenticate socket user
  socket.on('join_user_room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their personal room`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/simulate', simulateRoutes);

app.get('/', (req, res) => {
  res.send('Securofy API is running...');
});

const PORT = process.env.PORT || 5000;

// Connect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
