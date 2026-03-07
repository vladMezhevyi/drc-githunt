import { octokit } from '../../lib/github/github-client.js';
import { deepCamelCase, deepSnakeCase } from '../../utils/case-transform/case-transform.js';
import type { SearchRepositoriesQueryParams, SearchRepositoriesResponse } from './search.schema.js';

class SearchService {
  async searchRepositories(
    queryParams: SearchRepositoriesQueryParams,
  ): Promise<SearchRepositoriesResponse> {
    const params = deepSnakeCase(queryParams);
    const response = await octokit.request('GET /search/repositories', params);

    return deepCamelCase(response.data);
  }
}

export const searchService = new SearchService();
