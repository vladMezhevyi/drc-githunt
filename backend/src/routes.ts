import { Router } from 'express';
import { searchRouter } from './features/search/search.routes.js';

export const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/search', searchRouter);
