import express from 'express';
import volunteerController from '../controllers/volunteer.controller.js';
import verifyToken from '../middleware/Auth.js';

const router = express.Router();

router.post('/create', verifyToken, volunteerController.create);
router.get('/get', volunteerController.getAll);
router.get('/get/:id', volunteerController.getById);

export default router;
