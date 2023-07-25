/**
 * @module | Signup router
 * @description | Routes all requests to signup endpoint
 **/

import { Router } from 'express';
import userController from '../controllers/userController.js';
import signupController from '../controllers/signupController.js';
const router = Router();

router.get('/', userController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});

// Hashes password and inserts user to db: SIGNING UP
router.post(
  '/',
  signupController.usernameCheck,
  userController.createUser,
  (req, res) => {
    return res.status(201).json(res.locals.duplicated || res.locals.user);
  }
);

export default router;
