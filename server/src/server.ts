import "dotenv/config";
import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const server = http.createServer(app);



connectDB();

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

