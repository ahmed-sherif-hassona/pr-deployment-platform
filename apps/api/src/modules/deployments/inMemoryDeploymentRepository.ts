import type { Deployment, CreateDeploymentInput } from "./deployment.types.js";

import type { DeploymentRepository } from "./deployment.repository.js";

export class InMemoryDeploymentRepository implements DeploymentRepository {
  private deployments: Deployment[] = [];

  async create(input: CreateDeploymentInput): Promise<Deployment> {
    const deployment: Deployment = {
      id: crypto.randomUUID(),
      ...input,
      status: "queued",
      createdAt: new Date().toISOString(),
    };

    this.deployments.push(deployment);

    return deployment;
  }

  async findById(id: string): Promise<Deployment | null> {
    const deployment = this.deployments.find((item) => item.id === id);

    return deployment ?? null;
  }
}
