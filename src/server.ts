import "dotenv/config";
import { Server } from "./config";

const server = new Server();
server.start(3000);
