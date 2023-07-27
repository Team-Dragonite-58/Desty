/**
 * @module | Signup router
 * @description | Routes all requests to signup endpoint
 **/

import { Router } from 'express';
import userController from '../controllers/userController.js';
const router = Router();

// Hashes password and inserts user to db: SIGNING UP
router.post(
  '/',
  userController.usernameCheck,
  userController.createUser,
  (req, res) => {
    return res.status(201).json(res.locals.duplicated || res.locals.user);
  }
);

export default router;
