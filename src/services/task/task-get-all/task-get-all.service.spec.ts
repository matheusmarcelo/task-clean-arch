import { Test, TestingModule } from '@nestjs/testing';
import { TaskGetAllService } from './task-get-all.service';
import TaskRepositoryInMemory from '../../../infra/in-memory/task-repository-in-memory';
import { TaskEntity } from '../../../entities/task.entity';
import { InfraModule } from '../../../infra/infra.module';
import { DITaskTokenEnum } from '../../../enums/di-tokens/task';

describe('TaskGetAllService', () => {
  const taskRepository = new TaskRepositoryInMemory();
  let service: TaskGetAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfraModule],
      providers: [
        TaskGetAllService,
        {
          provide: DITaskTokenEnum.TASK_REPOSITORY,
          useValue: taskRepository
        }
      ]
    }).compile();

    service = module.get<TaskGetAllService>(TaskGetAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a Task list', async () => {
    const task: TaskEntity = {
      id: 1,
      title: 'title teste',
      description: 'description test'
    }

    await taskRepository.create(task);

    const tasks = await service.getAll();

    expect(tasks.length).toBeGreaterThan(0);
  })
});
