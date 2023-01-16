import { ref, get, push, set, remove, update } from "firebase/database";
import { database } from "../config";
import {
  projectDBProps,
  projectOptionalProps,
  projectProps,
  setDBPath,
} from "../utils";

class ProjectService {
  private dbRef = database.ref();
  private dbPath = "projects";

  constructor() {}

  public getAll = async (): Promise<projectDBProps> => {
    console.log("Getting all projects");
    try {
      const snapshot = await get(ref(this.dbRef, setDBPath(this.dbPath)));
      if (snapshot.exists()) {
        const projects = snapshot.val();
        console.log("Got all projects");
        return projects;
      } else {
        throw new Error("No projects found");
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  public queryById = async (projectId: string): Promise<projectProps> => {
    console.log(`Searching for project by id with value: "${projectId}"`);
    try {
      const snapshot = await get(
        ref(this.dbRef, setDBPath(this.dbPath, projectId))
      );
      if (snapshot.exists()) {
        const project = snapshot.val();
        console.log("Got project with id: " + projectId);
        return project;
      } else {
        throw new Error(`No project found with id: ${projectId}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  public create = async (data: projectProps): Promise<projectOptionalProps> => {
    console.log("Creating project in database");
    try {
      const newProjectKey = push(ref(this.dbRef, setDBPath(this.dbPath))).key;
      if (typeof newProjectKey !== "string")
        throw new Error("Unable to create unique key for project");

      await set(ref(this.dbRef, setDBPath(this.dbPath, newProjectKey)), data);
      console.log("Project was created with id: " + newProjectKey);
      return { id: newProjectKey, ...data };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  public update = async (
    newData: projectProps,
    projectId: string
  ): Promise<projectOptionalProps> => {
    console.log("Updating project data with id: " + projectId);
    try {
      await update(ref(this.dbRef, setDBPath(this.dbPath, projectId)), newData);
      console.log("Project data was updated. Project id: " + projectId);
      return { id: projectId, ...newData };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update project in database");
    }
  };

  public delete = async (projectId: string): Promise<projectOptionalProps> => {
    // WARNING: project will be permanently removed from the database
    console.log("Deleting project with id: " + projectId);
    try {
      await remove(ref(this.dbRef, setDBPath(this.dbPath, projectId)));
      console.log("Project deleted with id: " + projectId);
      return { id: projectId };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete project from database");
    }
  };
}

export default ProjectService;
