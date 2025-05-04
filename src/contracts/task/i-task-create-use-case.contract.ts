import { TaskEntity } from "src/entities/task.entity";

export interface ITaskCreateUseCase {
    create(task: TaskEntity): Promise<TaskEntity>
}