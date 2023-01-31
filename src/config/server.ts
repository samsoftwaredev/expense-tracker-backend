var cors = require("cors");
import express, { Request, Response } from "express";
import { headerMiddleware, requestListenerMiddleware } from "../middlewares";
import { ProjectController, ExpenseController } from "../controllers";

class Server {
  private server: any;
  private projectController: ProjectController;
  private expenseController: ExpenseController;
  private app = express.application;

  constructor() {
    this.app = express();
    this.projectController = new ProjectController();
    this.expenseController = new ExpenseController();

    this.preMiddleware();
    this.routes();
  }

  getApp = () => this.app;

  routes = () => {
    this.app.use("/api/expense", this.expenseController.router);

    this.app.use("/api/project", this.projectController.router);

    this.app.get("/", (req: Request, res: Response) => {
      res.send(new Date().toString());
    });
  };

  preMiddleware = () => {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(headerMiddleware);
    this.app.use(requestListenerMiddleware);
  };

  stop = () => {
    this.server.close();
  };

  start = async (port?: number) => {
    const PORT = port || process.env.APP_PORT || process.env.PORT;
    this.server = this.app.listen(PORT, () => {
      console.log("Server listening at port: " + PORT);
    });
  };
}

export default Server;
