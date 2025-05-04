import { Inject, Injectable } from '@nestjs/common';
import { ITaskGetAllUseCase } from '../../../contracts/task/i-task-get-all-use-case.contract';
import { ITaskRepository } from '../../../contracts/task/i-task-repository.contract';
import { TaskEntity } from '../../../entities/task.entity';
import { DITaskTokenEnum } from '../../../enums/di-tokens/task';

@Injectable()
export class TaskGetAllService implements ITaskGetAllUseCase {

    constructor(
        @Inject(DITaskTokenEnum.TASK_REPOSITORY)
        private readonly taskRepository: ITaskRepository
    ) { }

    async getAll(): Promise<TaskEntity[]> {
        return await this.taskRepository.getAll();
    }
}
