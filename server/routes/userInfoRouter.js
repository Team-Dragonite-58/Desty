/**
 * @module | Signup router
 * @description | Routes all requests to signup endpoint
 **/

import { Router } from 'express';
import userInfoController from '../controllers/userInfoController.js';
const router = Router();

router.patch(
  '/displayname',
  userInfoController.updateDisplayName,
  (req, res) => {
    return res.status(200).json('Successfully changed display name');
  }
);

router.patch(
  '/currentlocation',
  userInfoController.updateCurrentLocation,
  (req, res) => {
    return res.status(200).json('Successfully changed current location');
  }
);

export default router;
