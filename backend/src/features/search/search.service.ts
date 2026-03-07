import { githubRequest } from '../../lib/github/github-request.js';
import type {
  SearchRepositoriesQueryParams,
  SearchRepositoriesResponse,
  SearchUsersQueryParams,
  SearchUsersResponse,
} from './search.schema.js';

class SearchService {
  async searchRepositories(
    queryParams: SearchRepositoriesQueryParams,
  ): Promise<SearchRepositoriesResponse> {
    const response = await githubRequest('GET /search/repositories', queryParams);
    return response.data;
  }

  async searchUsers(queryParams: SearchUsersQueryParams): Promise<SearchUsersResponse> {
    const response = await githubRequest('GET /search/users', queryParams);
    return response.data;
  }
}

export const searchService = new SearchService();
