import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITaskDeleteUseCase } from '../../../contracts/task/i-task-delete-use-case.contract';
import { ITaskRepository } from '../../../contracts/task/i-task-repository.contract';
import { DITaskTokenEnum } from '../../../enums/di-tokens/task';

@Injectable()
export class TaskDeleteService implements ITaskDeleteUseCase {

    constructor(
        @Inject(DITaskTokenEnum.TASK_REPOSITORY)
        private readonly taskRepository: ITaskRepository
    ) { }

    async delete(id: number): Promise<void> {
        const taskFounded = await this.taskRepository.getById(id);

        if (!taskFounded) {
            throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
        }

        await this.taskRepository.delete(id);
    }
}
