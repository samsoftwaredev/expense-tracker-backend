import { database } from "../config";
import { ref, get, push, set, remove, update } from "firebase/database";
import {
  expenseDBProps,
  expenseOptionalProps,
  expenseProps,
  setDBPath,
} from "../utils";

class ExpenseService {
  private dbRef = database.ref();
  private dbPath = "expenses";

  constructor() {}

  public getAll = async (projectId: string): Promise<expenseDBProps> => {
    console.log("Getting all expenses in project: " + projectId);
    try {
      const snapshot = await get(
        ref(this.dbRef, setDBPath(this.dbPath, projectId))
      );
      if (snapshot.exists()) {
        const expenses = snapshot.val();
        console.log("Got all expenses");
        return expenses;
      } else {
        throw new Error("No expenses found");
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  public queryById = async (
    expenseId: string,
    projectId: string
  ): Promise<expenseProps> => {
    console.log(
      `Searching for expense by id with value: "${expenseId}" in project ${projectId}`
    );
    try {
      const snapshot = await get(
        ref(this.dbRef, setDBPath(this.dbPath, expenseId, projectId))
      );
      if (snapshot.exists()) {
        const expense = snapshot.val();
        console.log("Got expense with id: " + expenseId);
        return expense;
      } else {
        throw new Error(`No expense found with id: ${expenseId}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  public create = async (
    data: expenseProps,
    projectId: string
  ): Promise<expenseOptionalProps> => {
    console.log("Creating expense in project: " + projectId);
    try {
      const newKey = push(
        ref(this.dbRef, setDBPath(this.dbPath, projectId))
      ).key;
      if (typeof newKey !== "string")
        throw new Error("Unable to create unique key for expense");

      await set(
        ref(this.dbRef, setDBPath(this.dbPath, projectId, newKey)),
        data
      );
      console.log("Expense was created with id: " + newKey);
      return { id: newKey, ...data };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  public update = async (
    newData: expenseProps,
    expenseId: string,
    projectId: string
  ): Promise<expenseOptionalProps> => {
    console.log("Updating expense data with id: " + expenseId);
    try {
      await update(
        ref(this.dbRef, setDBPath(this.dbPath, projectId, expenseId)),
        newData
      );
      console.log("Expense data was updated. Expense id: " + expenseId);
      return { id: expenseId, ...newData };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update expense in database");
    }
  };

  public delete = async (
    expenseId: string,
    projectId: string
  ): Promise<expenseOptionalProps> => {
    // WARNING: expense will be permanently removed from the database
    console.log("Deleting expense with id: " + expenseId);
    try {
      await remove(
        ref(this.dbRef, setDBPath(this.dbPath, projectId, expenseId))
      );
      console.log("Expense deleted with id: " + expenseId);
      return { id: expenseId };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete expense from database");
    }
  };
}

export default ExpenseService;
