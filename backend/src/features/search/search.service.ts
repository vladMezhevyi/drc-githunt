import { octokit } from '../../lib/github/github-client.js';
import type { SearchRepositoriesQueryParams, SearchRepositoriesResponse } from './search.schema.js';

class SearchService {
  async searchRepositories(
    queryParams: SearchRepositoriesQueryParams,
  ): Promise<SearchRepositoriesResponse> {
    const response = await octokit.request('GET /search/repositories', {
      ...queryParams,
      per_page: queryParams.perPage,
    });

    return response.data;
  }
}

export const searchService = new SearchService();
