import type { Endpoints } from '@octokit/types';
import z from 'zod';

export const SearchRepositoriesQueryParamsSchema = z.object({
  q: z.string().min(1),
  sort: z.enum(['stars', 'forks', 'help-wanted-issues', 'updated']).optional(),
  order: z.enum(['desc', 'asc']).default('desc').optional(),
  perPage: z.coerce.number().positive().default(30).optional(),
  page: z.coerce.number().positive().default(1).optional(),
});

export type SearchRepositoriesQueryParams = z.infer<typeof SearchRepositoriesQueryParamsSchema>;

export type SearchRepositoriesResponse = Endpoints['GET /search/repositories']['response']['data'];
