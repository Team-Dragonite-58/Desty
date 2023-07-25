/**
 * @module Logout Router
 * @description Routes all requests to logout endpoint
 */
import { Router } from 'express';
import userController from '../controllers/userController.js';
const router = Router();

// ==========================================================
// Route: /
// Purpose: Removes token (sets token to null) after user logs out.
// ==========================================================
router.post(
  '/',
  userController.removeCookie,
  (req, res) => {
    return res.status(201).json({ loggedOut: 'true' });
  }
);

export default router;