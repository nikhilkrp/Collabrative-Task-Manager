import { Task } from "../models/task.model.js";
import { TaskStatus } from "../models/task.model.js";
import { getIO } from "../utils/socket.js";

export const createTaskService = async (
  data: any,
  creatorId: string
) => {
  const task = await Task.create({
    ...data,
    dueDate: new Date(data.dueDate),
    creatorId,
    assignedToId: data.assignedToId
  });

  return task;
};

export const getUserTasksService = async (userId: string) => {
  return Task.find({
    $or: [
      { creatorId: userId },
      { assignedToId: userId }
    ]
  })
    .populate("assignedToId", "name email")
    .sort({ dueDate: 1 });
};

export const updateTaskService = async (
  taskId: string,
  updates: any
) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    updates,
    { new: true }
  );

  if (!task) {
    throw new Error("Task not found");
  }

  const io = getIO();

  io.emit("task-updated", task);

  if (updates.assignedToId) {
    io.to(updates.assignedToId).emit(
      "task-assigned",
      task
    );
  }

  return task;
};

export const deleteTaskService = async (taskId: string) => {
  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};


export const getFilteredTasksService = async (
  userId: string,
  filters: any
) => {
  const query: any = {
    $or: [
      { creatorId: userId },
      { assignedToId: userId }
    ]
  };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.overdue === "true") {
    query.dueDate = { $lt: new Date() };
    query.status = { $ne: TaskStatus.COMPLETED };
  }

  return Task.find(query)
    .sort({ dueDate: 1 })
    .populate("assignedToId", "name email");
};

