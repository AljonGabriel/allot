//Import
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import db from './config/db.js';

//Imported Routes
import usersRoute from './routes/usersRoute.js';

//DB Connect
db();

const app = express();
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

//routes
app.use('/api/users', usersRoute);

app.get('/', (req, res) => res.send('Server is ready'));

//Port
const port = process.env.PORT || 5000;

//Listen to port
app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`),
);
