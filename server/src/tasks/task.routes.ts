import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getFilteredTasks
} from "./task.controller.js";


const router = Router();

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/filter", getFilteredTasks);

export default router;