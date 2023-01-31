import "dotenv/config";
import { Server } from "./config";

const server = new Server();
module.exports = server.getApp();
