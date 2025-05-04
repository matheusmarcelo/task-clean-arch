import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITaskGetByIdUseCase } from '../../../contracts/task/i-task-get-by-id-use-case.contract';
import { ITaskRepository } from '../../../contracts/task/i-task-repository.contract';
import { TaskEntity } from '../../../entities/task.entity';
import { DITaskTokenEnum } from '../../../enums/di-tokens/task';

@Injectable()
export class TaskGetByIdService implements ITaskGetByIdUseCase {

    constructor(
        @Inject(DITaskTokenEnum.TASK_REPOSITORY)
        private readonly taskRepository: ITaskRepository
    ) { }

    async getById(id: number): Promise<TaskEntity> {
        const taskFound = await this.taskRepository.getById(id);

        if (!taskFound) {
            throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
        }

        return taskFound;
    }
}
