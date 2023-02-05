import { Server } from "../config";
import { ExpenseController } from "../controllers";

const expenseController = new ExpenseController();

const server = new Server();
server.getApp().use("/api/expense", expenseController.router);

module.exports = server.getApp();
