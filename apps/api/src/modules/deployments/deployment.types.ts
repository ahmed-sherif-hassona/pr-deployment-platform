export type DeploymentStatus = "queued" | "building" | "running" | "failed" | "stopped";

export interface Deployment {
  id: string;
  repositoryId: string;
  pullRequestNumber: number;
  branch: string;
  status: DeploymentStatus;
  createdAt: string;
}

export interface CreateDeploymentInput {
  repositoryId: string;
  pullRequestNumber: number;
  branch: string;
}
