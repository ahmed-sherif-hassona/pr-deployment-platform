import { z } from "zod";

export const createDeploymentSchema = z.object({
  body: z.object({
    repositoryId: z.string().min(1),
    pullRequestNumber: z.number().int().positive(),
    branch: z.string().min(1),
  }),
  params: z.unknown(),
  query: z.unknown(),
});
