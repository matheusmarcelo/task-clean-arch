import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITaskCreateUseCase } from '../../../contracts/task/i-task-create-use-case.contract';
import { ITaskRepository } from '../../../contracts/task/i-task-repository.contract';
import { TaskEntity } from '../../../entities/task.entity';
import { TaskEnum, DITaskTokenEnum } from '../../../enums/di-tokens/task';

@Injectable()
export class TaskCreateService implements ITaskCreateUseCase {

    constructor(
        @Inject(DITaskTokenEnum.TASK_REPOSITORY)
        private readonly taskRepository: ITaskRepository
    ) { }

    async create(task: TaskEntity): Promise<TaskEntity> {
        const taskFound = await this.taskRepository.getByTitle(task);

        if (taskFound) {
            throw new HttpException('Task already created', HttpStatus.BAD_REQUEST);
        }

        task.create_at = new Date();
        task.status = TaskEnum.TO_DO;

        await this.taskRepository.create(task);

        return task;
    }
}
