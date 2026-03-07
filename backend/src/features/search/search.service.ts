import { octokit } from '../../lib/github/github-client.js';
import { deepCamelCase, deepSnakeCase } from '../../utils/case-transform/case-transform.js';
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
    const params = deepSnakeCase(queryParams);
    const response = await octokit.request('GET /search/repositories', params);

    return deepCamelCase(response.data);
  }

  async searchUsers(queryParams: SearchUsersQueryParams): Promise<SearchUsersResponse> {
    const params = deepSnakeCase(queryParams);
    const response = await octokit.request('GET /search/users', params);

    return deepCamelCase(response.data);
  }
}

export const searchService = new SearchService();
