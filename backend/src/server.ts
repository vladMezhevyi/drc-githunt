import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter } from './middleware/rate-limiter.js';
import { githubClient } from './lib/github/github-client.js';
import { env } from './common/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { requestLogger } from './middleware/request-logger.js';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    methods: 'GET',
  }),
);
app.use(requestLogger);
app.use(rateLimiter);

app.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/users', async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const response = await githubClient.get(`/users/${username}`);
  res.status(200).json(response);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);
