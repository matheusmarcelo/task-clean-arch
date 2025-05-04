import { Global, Module } from '@nestjs/common';
import { DITaskTokenEnum } from '../enums/di-tokens/task';
import TaskRepositoryInMemory from './in-memory/task-repository-in-memory';

const RepositoryProviders = [
    {
        provide: DITaskTokenEnum.TASK_REPOSITORY,
        useClass: TaskRepositoryInMemory
    }
]

@Global()
@Module({
    providers: [...RepositoryProviders],
    exports: [...RepositoryProviders],
})
export class InfraModule { }
