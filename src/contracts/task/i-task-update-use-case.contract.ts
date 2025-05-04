import { TaskEntity } from "src/entities/task.entity";

export interface ITaskUpdateUseCase {
    update(id: number, task: TaskEntity): Promise<TaskEntity>
}