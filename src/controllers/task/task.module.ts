import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskGetAllService } from '../../services/task/task-get-all/task-get-all.service';
import { TaskGetByIdService } from '../../services/task/task-get-by-id/task-get-by-id.service';
import { TaskCreateService } from '../../services/task/task-create/task-create.service';
import { TaskUpdateService } from '../../services/task/task-update/task-update.service';
import { TaskDeleteService } from '../../services/task/task-delete/task-delete.service';
import TaskRepositoryInMemory from '../../infra/in-memory/task-repository-in-memory';
import { DITaskTokenEnum } from '../../enums/di-tokens/task';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  controllers: [TaskController],
  imports: [InfraModule],
  providers: [
    {
      provide: DITaskTokenEnum.TASK_GET_ALL_USE_CASE,
      useClass: TaskGetAllService
    },
    {
      provide: DITaskTokenEnum.TASK_GET_BY_ID_USE_CASE,
      useClass: TaskGetByIdService
    },
    {
      provide: DITaskTokenEnum.TASK_CREATE_USE_CASE,
      useClass: TaskCreateService
    },
    {
      provide: DITaskTokenEnum.TASK_UPDATE_USE_CASE,
      useClass: TaskUpdateService
    },
    {
      provide: DITaskTokenEnum.TASK_DELETE_USE_CASE,
      useClass: TaskDeleteService
    }
  ]
})
export class TaskModule { }
