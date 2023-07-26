// import/prep for our server and type declarations
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import loginRouter from './routes/loginRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import signupRouter from './routes/signupRouter.js';
import locationRouter from './routes/locationRouter.js';

// const path = require('path');
//import path from 'path';

const app = express();

// allow requests from other domains
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // return res.send('Welcome to the backend server!');
  return res.json(res.locals.users);
  //  return res.json('done');
});

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/getLocation', locationRouter);
d;

// Handling requests to unknown endpoints...
app.use((req, res) => {
  return res
    .status(404)
    .send({ error: 'Unknown endpoint YES HIT ROUTE please try again.' });
});

// Handling global errors...
app.use(
  '/',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err, req, res) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign(defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

export default app;
