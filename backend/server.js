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
import usersRoutes from './routes/usersRoutes.js';
import postRoutes from './routes/postRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

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
app.use('/api/users', usersRoutes);
app.use('/api/uploads', postRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/v1/comments', commentRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);
//Port
const port = process.env.PORT || 5000;

//Listen to port
app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`),
);
