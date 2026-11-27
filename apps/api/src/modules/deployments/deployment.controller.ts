import type { Request, Response } from "express";
import { DeploymentService } from "./deployment.service.js";
import { AppError } from "../../shared/errors/AppError.js";

export class DeploymentController {
  constructor(private service: DeploymentService) {}

  createDeployment = async (req: Request, res: Response): Promise<void> => {
    const deployment = await this.service.createDeployment(req.body);

    res.status(201).json({
      status: "success",
      data: deployment,
    });
  };

  getDeploymentById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const deployment = await this.service.getDeploymentById(req.params.id);

    if (!deployment) {
      throw new AppError(404, "Deployment not found");
    }

    res.status(200).json({
      status: "success",
      data: deployment,
    });
  };
}
