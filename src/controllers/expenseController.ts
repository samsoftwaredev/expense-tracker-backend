import { Router, Request, Response } from "express";
import { ExpenseService } from "../services";
import { expenseDBProps, expenseOptionalProps, expenseProps } from "../utils";

class ExpenseController {
  public router: Router;
  private expenseService: ExpenseService;

  constructor() {
    this.router = Router();
    this.expenseService = new ExpenseService();
    this.routes();
  }

  public getAll = async (req: Request, res: Response) => {
    const projectId: string = req.params.projectId;
    try {
      const expenses: expenseDBProps = await this.expenseService.getAll(
        projectId
      );
      console.log(expenses);
      res.status(200).send(expenses);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  };

  public queryById = async (req: Request, res: Response) => {
    const expenseId: string = req.params.id;
    const projectId: string = req.params.projectId;

    try {
      const user: expenseProps = await this.expenseService.queryById(
        expenseId,
        projectId
      );
      res.status(200).send(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  public create = async (req: Request, res: Response) => {
    const expenseData: expenseProps = req.body;
    const projectId: string = req.params.projectId;

    try {
      const expenseKey: expenseOptionalProps = await this.expenseService.create(
        expenseData,
        projectId
      );
      res.status(200).send(expenseKey);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  public update = async (req: Request, res: Response) => {
    const expenseId: string = req.params.id;
    const projectId: string = req.params.projectId;
    const newExpenseData: expenseProps = req.body;
    try {
      const expenseUpdated: expenseOptionalProps =
        await this.expenseService.update(newExpenseData, expenseId, projectId);
      res.status(200).send(expenseUpdated);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const projectId: string = req.params.projectId;
    const expenseId: string = req.params.id;
    try {
      const expense = await this.expenseService.delete(expenseId, projectId);
      res.status(200).send(expense);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public routes = () => {
    // This endpoint has to be before the GET /:id endpoint
    this.router.get("/:id/project/:projectId", this.queryById);

    this.router.post("/create/project/:projectId", this.create);

    this.router.put("/:id/project/:projectId", this.update);

    this.router.delete("/:id/project/:projectId", this.delete);

    this.router.get("/project/:projectId", this.getAll);
  };
}

export default ExpenseController;
