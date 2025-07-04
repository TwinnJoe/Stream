import express from 'express';
import { listMedia, uploadMedia } from '../controllers/mediaController.js';
const router = express.Router();

router.get('/', listMedia);
router.post('/', uploadMedia);

export default router;
