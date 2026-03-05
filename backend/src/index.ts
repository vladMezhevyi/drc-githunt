import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter } from './middleware/rate-limiter.js';
import { config } from './config.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: 'GET',
  }),
);
app.use(rateLimiter);

app.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(config.PORT, () => {
  console.log(`Server started on ${config.PORT} port`);
});
