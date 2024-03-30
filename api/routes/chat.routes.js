import express from 'express';
import chatController from '../controllers/chat.controller.js';
import verifyToken from '../middleware/Auth.js';

const router = express.Router();

router.get('/:id',verifyToken, chatController.getMessages);
router.get('/',verifyToken, chatController.getChats);
router.post('/send/:id',verifyToken, chatController.sendMessage);



export default router;
