import express from 'express';
import { register } from '../controllers/usersController.js';
import { loginController } from '../controllers/usersController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', loginController);

export default router;
