import type { CreateDeploymentInput, Deployment } from "./deployment.types.js";
import type { DeploymentRepository } from "./deployment.repository.js";

export class DeploymentService {
  constructor(private repository: DeploymentRepository) {}

  async createDeployment(input: CreateDeploymentInput): Promise<Deployment> {
    return this.repository.create(input);
  }

  async getDeploymentById(id: string): Promise<Deployment | null> {
    return this.repository.findById(id);
  }
}
