import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import TaskRepositoryInMemory from '../../infra/in-memory/task-repository-in-memory';
import { TaskEntity } from '../../entities/task.entity';
import { TaskEnum } from '../../enums/di-tokens/task/task-enum';
import { TaskCreateService } from '../../services/task/task-create/task-create.service';
import { TaskDeleteService } from '../../services/task/task-delete/task-delete.service';
import { TaskGetAllService } from '../../services/task/task-get-all/task-get-all.service';
import { TaskGetByIdService } from '../../services/task/task-get-by-id/task-get-by-id.service';
import { TaskUpdateService } from '../../services/task/task-update/task-update.service';
import { DITaskTokenEnum } from '../../enums/di-tokens/task';
import { InfraModule } from '../../infra/infra.module';

describe('TaskController', () => {
  const taskRepository = new TaskRepositoryInMemory();
  const taskGetAllService = new TaskGetAllService(taskRepository);
  const taskGetByIdService = new TaskGetByIdService(taskRepository);
  const taskCreateService = new TaskCreateService(taskRepository);
  const taskUpdateService = new TaskUpdateService(taskRepository);
  const taskDeleteService = new TaskDeleteService(taskRepository);

  let controller: TaskController = new TaskController(
    taskGetAllService,
    taskGetByIdService,
    taskCreateService,
    taskUpdateService,
    taskDeleteService
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfraModule],
      controllers: [TaskController],
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
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a task with id = 1', async () => {
    const taskEntity: TaskEntity = {
      id: 1,
      title: 'task test',
      description: 'description test',
    }

    await controller.create(taskEntity);

    const task = await controller.getById(taskEntity.id);

    expect(task.id).toBe(1);
    expect(task.title).toBe('task test');
  });

  it('should return a tasks array', async () => {
    const taskEntity: TaskEntity = {
      id: 1,
      title: 'task test',
      description: 'description test',
    }

    await controller.create(taskEntity);

    const tasks = await controller.getAll();
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(1);
  });

  it('should be created', async () => {
    const taskEntity: TaskEntity = {
      id: 1,
      title: 'task test',
      description: 'description test',
    }

    const task = await controller.create(taskEntity) as TaskEntity;

    expect(task.status).toBe(TaskEnum.TO_DO);
  });

  it('should be updated', async () => {
    const taskEntity: TaskEntity = {
      id: 1,
      title: 'task test',
      description: 'description test',
    }

    await controller.create(taskEntity);

    taskEntity.status = TaskEnum.IN_PROGRESS;

    await controller.update(taskEntity.id, taskEntity);

    expect(taskEntity.status).toBe(TaskEnum.IN_PROGRESS);
  });

  it('should be deleted', async () => {
    const taskEntity: TaskEntity = {
      id: 1,
      title: 'task test',
      description: 'description test',
    }

    await controller.create(taskEntity);

    await controller.delete(taskEntity.id);

    await expect(controller.getById(taskEntity.id)).rejects.toThrow();
  });
});
