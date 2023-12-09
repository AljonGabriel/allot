//Import
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from 'path';

//import custom error handlers
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

import session from 'express-session';

//Import DB
import db from './configs/db.js';
//DB Connect
db();

//Imported Routes
import usersRoute from './routes/usersRoute.js';
import uploadsRoute from './routes/uploadsRoutes.js';

//Socket.io
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(3000);

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 204,
    credentials: true, // Allow credentials (cookies, authentication)
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use express-session middleware
app.use(
  session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(cookieParser());
const uploadsPath = path.join('frontend', 'src', 'assets', 'uploads');
app.use(express.static(uploadsPath));
//routes
app.use('/api/users', usersRoute);
app.use('/api/uploads', uploadsRoute);

app.get('/', (req, res) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events from connected clients
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // Emit a test event to the connected client
    socket.emit('serverEvent', 'Hello, Client!');

    // Listen for events from the client
    socket.on('testEvent', (data) => {
      console.log('Received from client:', data);
    });
  });
});

app.use(notFound);
app.use(errorHandler);
//Port
const port = process.env.PORT || 5000;

//Listen to port
app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`),
);
