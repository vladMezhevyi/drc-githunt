import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter } from './middleware/rate-limiter.js';
import { githubClient } from './lib/github-client.js';
import { env } from './common/env.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/error-handler.js';
import { requestLogger } from './middleware/request-logger.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    methods: 'GET',
  }),
);
app.use(rateLimiter);

app.use(requestLogger);

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

app.listen(env.PORT, () => {
  logger.info(`Server started on ${env.PORT} port`);
});
