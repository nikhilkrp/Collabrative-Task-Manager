import { Request, Response } from "express";
import { getFilteredTasksService } from "./task.service.js";

import {
    createTaskSchema,
    updateTaskSchema
} from "./task.dto.js";
import {
    createTaskService,
    getUserTasksService,
    updateTaskService,
    deleteTaskService
} from "./task.service.js";


export const createTask = async (req: Request, res: Response) => {
    try {
        const data = createTaskSchema.parse(req.body);

        const task = await createTaskService(
            data,
            req.user!.id
        );

        res.status(201).json(task);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await getUserTasksService(req.user!.id);
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const updates = updateTaskSchema.parse(req.body);

        const task = await updateTaskService(
            req.params.id,
            updates
        );

        res.json(task);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        await deleteTaskService(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};


export const getFilteredTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await getFilteredTasksService(
            req.user!.id,
            req.query
        );

        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

