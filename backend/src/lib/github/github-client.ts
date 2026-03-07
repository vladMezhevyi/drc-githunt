import { env } from '../../common/env.js';

export interface GithubClientOptions {
  params?: Record<string, string>;
  headers?: RequestInit['headers'];
}

class GithubClient {
  private readonly token: string = env.GITHUB_TOKEN;
  private readonly apiUrl: string = env.GITHUB_API_URL;

  private readonly requiredHeaders: RequestInit['headers'] = {
    Authorization: `Bearer ${this.token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  async get<T>(pathname: string, options?: GithubClientOptions): Promise<T> {
    const url: URL = this.buildUrl(pathname, options?.params);

    const response = await fetch(url, {
      headers: {
        ...this.requiredHeaders,
        ...options?.headers,
      },
    });

    if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);

    return response.json() as T;
  }

  private buildUrl(pathname: string, params?: Record<string, string>): URL {
    let url = new URL(`${this.apiUrl}${pathname}`);

    if (params && Object.keys(params).length) {
      const searchParams = new URLSearchParams([
        ...Array.from(url.searchParams),
        ...Object.entries(params),
      ]);

      url = new URL(`${url.origin}${url.pathname}?${searchParams}`);
    }

    return url;
  }
}

export const githubClient = new GithubClient();
