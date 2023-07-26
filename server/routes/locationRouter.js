import { Router } from 'express';
import locationController from '../controllers/locationController.js';

const router = Router();

router.get('/', locationController, (req, res) => {
  return res.status(200).json(res.locals.signedIn);
});

export default router;
