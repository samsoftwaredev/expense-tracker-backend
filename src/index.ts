import "dotenv/config";
import { Server } from "./config";

const server = new Server();
server.start();
// Export the Express API
module.exports = server.getApp();
