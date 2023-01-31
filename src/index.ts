import "dotenv/config";
import { Server } from "./config";

const server = new Server();
// Export the Express API
module.exports = server.getApp();
