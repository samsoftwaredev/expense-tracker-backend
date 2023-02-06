const app = require("../app");
import { ExpenseController } from "../controllers";

const expenseController = new ExpenseController();

app.use("/api/expense", expenseController.router);

module.exports = app;
