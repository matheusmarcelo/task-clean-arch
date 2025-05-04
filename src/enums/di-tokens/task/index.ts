import { TaskEnum } from "./task-enum";

enum DITaskTokenEnum {
    TASK_GET_ALL_USE_CASE = 'ITaskGetAllUseCase',
    TASK_GET_BY_ID_USE_CASE = 'ITaskGetByIdUseCase',
    TASK_CREATE_USE_CASE = 'ITaskCreateUseCase',
    TASK_UPDATE_USE_CASE = 'ITaskUpdateUseCase',
    TASK_DELETE_USE_CASE = 'ITaskDeleteUseCase',
    TASK_REPOSITORY = 'ITaskRepository',
}

export {
    TaskEnum,
    DITaskTokenEnum
}