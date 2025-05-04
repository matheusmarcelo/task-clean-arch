import { Test, TestingModule } from '@nestjs/testing';
import { TaskCreateService } from './task-create.service';
import { TaskEntity } from '../../../entities/task.entity';
import { DITaskTokenEnum, TaskEnum } from '../../../enums/di-tokens/task';
import TaskRepositoryInMemory from '../../../infra/in-memory/task-repository-in-memory';

describe('TaskCreateService', () => {
  let taskRepository = new TaskRepositoryInMemory();
  let service: TaskCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskCreateService,
        {
          provide: DITaskTokenEnum.TASK_REPOSITORY,
          useValue: taskRepository
        }
      ],
    }).compile();

    service = module.get<TaskCreateService>(TaskCreateService);
    taskRepository = new TaskRepositoryInMemory();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created', async () => {
    const task: TaskEntity = {
      id: 1,
      title: 'title test',
      description: 'description test'
    };

    const taskCreated = await service.create(task);

    expect(taskCreated.id).toBe(task.id);
    expect(taskCreated.status).toBe(TaskEnum.TO_DO);
  });

  it('should return a HttpException', async () => {
    const task: TaskEntity = {
      id: 1,
      title: 'title test',
      description: 'description test'
    };

    await service.create(task);

    await expect(service.create(task)).rejects.toThrow('Task already created');
  });
});
