import { TaskEntity } from "src/entities/task.entity";

export interface ITaskGetAllUseCase {
    getAll(): Promise<TaskEntity[]>
}