import { Test, TestingModule } from '@nestjs/testing';
import { TaskGetByIdService } from './task-get-by-id.service';
import TaskRepositoryInMemory from '../../../infra/in-memory/task-repository-in-memory';
import { TaskEntity } from '../../../entities/task.entity';
import { InfraModule } from '../../../infra/infra.module';
import { DITaskTokenEnum } from '../../../enums/di-tokens/task';

describe('TaskGetByIdService', () => {
  const taskRepository = new TaskRepositoryInMemory();
  let service: TaskGetByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfraModule],
      providers: [
        TaskGetByIdService,
        {
          provide: DITaskTokenEnum.TASK_REPOSITORY,
          useValue: taskRepository
        }
      ]
    }).compile();

    service = module.get<TaskGetByIdService>(TaskGetByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should found a task with id = 1', async () => {
    const task: TaskEntity = {
      id: 1,
      title: 'title teste',
      description: 'description test'
    }

    await taskRepository.create(task);

    const taskFound = await service.getById(task.id);

    expect(taskFound).toBeTruthy();
  });

  it('should return a HttpException', async () => {
    await expect(service.getById(2)).rejects.toThrow();
  });
});
