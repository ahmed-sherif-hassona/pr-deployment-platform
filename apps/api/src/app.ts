import express from "express";
import { notFound } from "./shared/errors/notFound.js";
import { errorHandler } from "./shared/errors/errorHandler.js";
import healthRoutes from "./modules/health/health.routes.js";
import deploymentRoutes from "./modules/deployments/deployment.routes.js";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/v1/deployments", deploymentRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
