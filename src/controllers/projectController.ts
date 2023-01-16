import { Router, Request, Response } from "express";
import { ProjectService } from "../services";
import { projectDBProps, projectOptionalProps, projectProps } from "../utils";

class ProjectController {
  public router: Router;
  private ProjectService: ProjectService;

  constructor() {
    this.router = Router();
    this.ProjectService = new ProjectService();
    this.routes();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const projects: projectDBProps = await this.ProjectService.getAll();
      console.log(projects);
      res.status(200).send(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  };

  public queryById = async (req: Request, res: Response) => {
    const projectId: string = req.params.id;
    try {
      const user: projectProps = await this.ProjectService.queryById(projectId);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  public create = async (req: Request, res: Response) => {
    const projectData: projectProps = req.body;
    try {
      const projectKey: projectOptionalProps = await this.ProjectService.create(
        projectData
      );
      res.status(200).send(projectKey);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  public update = async (req: Request, res: Response) => {
    const projectId: string = req.params.id;
    const newProjectData: projectProps = req.body;
    try {
      const projectUpdated: projectOptionalProps =
        await this.ProjectService.update(newProjectData, projectId);
      res.status(200).send(projectUpdated);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const projectId: string = req.params.id;
    try {
      await this.ProjectService.delete(projectId);
      res.status(200).send();
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public routes = () => {
    // This endpoint has to be before the GET /:id endpoint
    this.router.get("/:id", this.queryById);

    this.router.post("/create", this.create);

    this.router.put("/:id", this.update);

    this.router.delete("/:id", this.delete);

    this.router.get("/", this.getAll);
  };
}

export default ProjectController;
