/**
 * @module Login Router
 * @description Routes all requests to login endpoint
 */
import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

// ==========================================================
// Route: /
// Purpose: verify username and password
// ==========================================================

router.post(
  '/',
  userController.verifyUser,
  // userController.addCookie,
  (req, res) => {
    return res.status(201).json(res.locals.user);
  }
);

router.get(
  '/checkCookie',
  userController.checkCookie,
  (req, res) => {
    return res.status(200).json(res.locals.signedIn);
  }
);

export default router;
