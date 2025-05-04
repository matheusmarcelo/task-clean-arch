import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../../contracts/task/i-task-repository.contract';
import { ITaskUpdateUseCase } from '../../../contracts/task/i-task-update-use-case.contract';
import { TaskEntity } from '../../../entities/task.entity';
import { DITaskTokenEnum } from '../../../enums/di-tokens/task';

@Injectable()
export class TaskUpdateService implements ITaskUpdateUseCase {

    constructor(
        @Inject(DITaskTokenEnum.TASK_REPOSITORY)
        private readonly taskRepository: ITaskRepository
    ) { }

    async update(id: number, task: TaskEntity): Promise<TaskEntity> {
        const taskFounded = await this.taskRepository.getById(id);

        if (!taskFounded) {
            throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
        }

        return await this.taskRepository.update(id, task);
    }
}
