import { Router } from "express";
import { DeploymentController } from "./deployment.controller.js";
import { DeploymentService } from "./deployment.service.js";
import { InMemoryDeploymentRepository } from "./inMemoryDeploymentRepository.js";
import { validate } from "../../shared/validation/validate.js";
import { createDeploymentSchema } from "./deployment.schemas.js";

const router = Router();

const repository = new InMemoryDeploymentRepository();
const service = new DeploymentService(repository);
const controller = new DeploymentController(service);

router.post("/", validate(createDeploymentSchema), controller.createDeployment);
router.get("/:id", controller.getDeploymentById);

export default router;
