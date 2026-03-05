import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter } from './middleware/rate-limiter.js';

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

if (!PORT || !CLIENT_URL) {
  throw new Error('Missing required environment variables');
}

app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
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

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
