import { Router } from 'express';
import locationController from '../controllers/locationController.js';

const router = Router();

router.get('/get', locationController.getLocation, (req, res) => {
  return res.status(200).json(res.locals.locations);
});

router.post('/create', locationController.createLocation, (req, res) => {
  return res.status(200).json(res.locals.locationsList);
});

export default router;
