import type { RequestHandler } from 'express';
import type { SearchRepositoriesQueryParams } from './search.schema.js';
import { searchService } from './search.service.js';
import { HttpStatusCode } from '../../common/http-status-code.js';

class SearchController {
  searchRepositories: RequestHandler = async (_req, res): Promise<void> => {
    const queryParams = res.locals.query as SearchRepositoriesQueryParams;
    const result = await searchService.searchRepositories(queryParams);
    res.status(HttpStatusCode.OK).json(result);
  };
}

export const searchController = new SearchController();
