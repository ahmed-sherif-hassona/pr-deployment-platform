import type { Deployment, CreateDeploymentInput } from "./deployment.types.js";

export interface DeploymentRepository {
  create(input: CreateDeploymentInput): Promise<Deployment>;

  findById(id: string): Promise<Deployment | null>;
}
