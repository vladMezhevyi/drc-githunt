import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { SearchRepositoriesQueryParamsSchema } from './search.schema.js';
import { searchController } from './search.controller.js';

export const searchRouter = Router();

searchRouter.get(
  '/repositories',
  validate({ query: SearchRepositoriesQueryParamsSchema }),
  searchController.searchRepositories,
);
