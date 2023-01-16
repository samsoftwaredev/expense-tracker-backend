import "dotenv/config";
import "reflect-metadata";
import { Server } from "./config";

const server = new Server();
server.start();
