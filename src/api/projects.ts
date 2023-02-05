import { Server } from "../config";
import { ProjectController } from "../controllers";

const projectController = new ProjectController();

const server = new Server();
server.getApp().use("/api/project", projectController.router);

module.exports = server.getApp();
