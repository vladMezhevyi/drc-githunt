import type { Endpoints, RequestParameters } from '@octokit/types';
import { RequestError } from '@octokit/request-error';
import { octokit } from './github-client.js';
import { HttpException } from '../../common/http-exception.js';
import { HttpStatusCode } from '../../common/http-status-code.js';

type ErrorMessages = Partial<Record<number, string>>;

export const githubRequest = async <E extends keyof Endpoints>(
  endpoint: E,
  params?:
    | (E extends keyof Endpoints
        ? Endpoints[E]['parameters'] & RequestParameters
        : RequestParameters)
    | undefined,
  errorMessages: ErrorMessages = {},
): Promise<Endpoints[E]['response']> => {
  try {
    return await octokit.request(endpoint, params);
  } catch (error) {
    if (error instanceof RequestError) {
      const message = errorMessages[error.status];
      if (message) {
        throw new HttpException(error.status as HttpStatusCode, message);
      }

      throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    throw error;
  }
};
