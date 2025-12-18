import { createTaskService } from "../src/tasks/task.service.js";

describe("Task Service", () => {
    it("should create task with valid data", async () => {
        const data = {
            title: "Test Task",
            dueDate: new Date().toISOString(),
            priority: "High",
            assignedToId: "507f191e810c19729de860ea"
        };

        const task = await createTaskService(data, data.assignedToId);

        expect(task.title).toBe("Test Task");
    });
});
