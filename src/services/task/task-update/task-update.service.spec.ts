import { Test, TestingModule } from '@nestjs/testing';
import { TaskUpdateService } from './task-update.service';
import TaskRepositoryInMemory from '../../../infra/in-memory/task-repository-in-memory';
import { TaskEntity } from '../../../entities/task.entity';
import { InfraModule } from '../../../infra/infra.module';
import { DITaskTokenEnum } from '../../../enums/di-tokens/task';

describe('TaskUpdateService', () => {
  const taskRepository = new TaskRepositoryInMemory();
  let service: TaskUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskUpdateService,
        {
          provide: DITaskTokenEnum.TASK_REPOSITORY,
          useValue: taskRepository
        }
      ],
    }).compile();

    service = module.get<TaskUpdateService>(TaskUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update task', async () => {
    const task: TaskEntity = {
      id: 1,
      title: 'title teste',
      description: 'description test'
    }

    await taskRepository.create(task);

    const taskFound = await service.update(task.id, task);

    expect(taskFound).toBeTruthy();
  });

  it('should return a HttpException', async () => {
    const task: TaskEntity = {
      id: 1,
      title: 'title teste',
      description: 'description test'
    }

    await taskRepository.create(task);

    await expect(service.update(2, task)).rejects.toThrow();
  });
});
