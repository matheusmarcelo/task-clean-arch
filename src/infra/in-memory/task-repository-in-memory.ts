import { Injectable } from "@nestjs/common";
import { ITaskRepository } from "../../contracts/task/i-task-repository.contract";
import { TaskEntity } from "../../entities/task.entity";
import { TaskEnum } from "../../enums/di-tokens/task/task-enum";


@Injectable()
class TaskRepositoryInMemory implements ITaskRepository {
    private tasks: TaskEntity[] = [];

    async getAll(): Promise<TaskEntity[]> {
        return this.tasks;
    }

    async getById(id: number): Promise<TaskEntity | null> {
        return this.tasks.find(task => task.id === Number(id));
    }

    async getByTitle(taskEntity: TaskEntity): Promise<TaskEntity> {
        return this.tasks.find(task => task.title === taskEntity.title && taskEntity.status !== TaskEnum.DELETED)
    }

    async create(task: TaskEntity): Promise<TaskEntity> {
        this.tasks.push(task);

        return task;
    }

    async update(id: number, task: TaskEntity): Promise<TaskEntity> {
        const index = this.tasks.findIndex(task => task.id === Number(id));

        if (index !== -1) {
            this.tasks[index] = task;
            return this.tasks[index];
        }
    }

    async delete(id: number): Promise<void> {
        const index = this.tasks.findIndex(task => task.id === Number(id));

        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}

export default TaskRepositoryInMemory;