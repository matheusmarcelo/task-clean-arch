import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { IBaseContract } from '../../contracts/i-base-contract.contract';
import { TaskEntity } from '../../entities/task.entity';
import { ITaskGetAllUseCase } from '../../contracts/task/i-task-get-all-use-case.contract';
import { ITaskGetByIdUseCase } from '../../contracts/task/i-task-get-by-id-use-case.contract';
import { ITaskCreateUseCase } from '../../contracts/task/i-task-create-use-case.contract';
import { ITaskUpdateUseCase } from '../../contracts/task/i-task-update-use-case.contract';
import { ITaskDeleteUseCase } from '../../contracts/task/i-task-delete-use-case.contract';

@Controller('task')
export class TaskController implements IBaseContract {

    constructor(
        @Inject('ITaskGetAllUseCase')
        private readonly taskGetAllService: ITaskGetAllUseCase,
        @Inject('ITaskGetByIdUseCase')
        private readonly taskGetByIdService: ITaskGetByIdUseCase,
        @Inject('ITaskCreateUseCase')
        private readonly taskCreateService: ITaskCreateUseCase,
        @Inject('ITaskUpdateUseCase')
        private readonly taskUpdateService: ITaskUpdateUseCase,
        @Inject('ITaskDeleteUseCase')
        private readonly taskDeleteService: ITaskDeleteUseCase,
    ) { }

    @Get('')
    async getAll(): Promise<TaskEntity[]> {
        return await this.taskGetAllService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<TaskEntity> {
        return await this.taskGetByIdService.getById(id);
    }

    @Post('')
    async create(@Body() entity: TaskEntity): Promise<void | TaskEntity> {
        return await this.taskCreateService.create(entity);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() entity: TaskEntity): Promise<void | TaskEntity> {
        return await this.taskUpdateService.update(id, entity);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.taskDeleteService.delete(id);
    }
}
