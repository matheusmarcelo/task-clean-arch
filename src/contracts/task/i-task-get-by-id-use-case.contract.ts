import { TaskEntity } from "src/entities/task.entity";

export interface ITaskGetByIdUseCase {
    getById(id: number): Promise<TaskEntity>
}