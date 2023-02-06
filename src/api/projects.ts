const app = require("../app");
import { ProjectController } from "../controllers";

const projectController = new ProjectController();

app.use("/api/project", projectController.router);

module.exports = app;
