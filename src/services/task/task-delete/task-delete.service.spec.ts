import { Test, TestingModule } from '@nestjs/testing';
import { TaskDeleteService } from './task-delete.service';
import { TaskEntity } from '../../../entities/task.entity';
import TaskRepositoryInMemory from '../../../infra/in-memory/task-repository-in-memory';
import { DITaskTokenEnum } from '../../../enums/di-tokens/task';

describe('TaskDeleteService', () => {
  const taskRepository = new TaskRepositoryInMemory();
  let service: TaskDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskDeleteService,
        {
          provide: DITaskTokenEnum.TASK_REPOSITORY,
          useValue: taskRepository
        }
      ],
    }).compile();

    service = module.get<TaskDeleteService>(TaskDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete task', async () => {
    const task: TaskEntity = {
      id: 1,
      title: 'title teste',
      description: 'description test'
    }

    await taskRepository.create(task);

    await service.delete(task.id);

    const taskFound = await taskRepository.getById(task.id);

    expect(taskFound).toBeFalsy();
  });

  it('should return a HttpException', async () => {
    await expect(service.delete(2)).rejects.toThrow();
  });
});
