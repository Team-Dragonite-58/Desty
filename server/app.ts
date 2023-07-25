// import/prep for our server and type declarations
import express, { Request, Response } from 'express';
import { ServerError, GlobalErrorObject } from '../types';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const path = require('path');
import loginRouter from './routes/loginRouter';
import logoutRouter from './routes/logoutRouter';
import signupRouter from './routes/signupRouter';

const app = express();

// allow requests from other domains
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
