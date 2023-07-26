import { Router } from 'express';
import locationController from '../controllers/locationController.js';

const router = Router();

router.get('/', locationController.getLocation, (req, res) => {
  return res.status(200).json(res.locals.locations);
});

export default router;
