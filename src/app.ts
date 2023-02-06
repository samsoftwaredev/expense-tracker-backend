import "dotenv/config";
import { Server } from "./config";

const server = new Server();
// Export the Express APIs
module.exports = server.getApp();
