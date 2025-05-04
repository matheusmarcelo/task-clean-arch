import { TaskEntity } from "src/entities/task.entity";
import { IBaseContract } from "../i-base-contract.contract";

export interface ITaskRepository extends IBaseContract {
    getByTitle(task: TaskEntity): Promise<TaskEntity>
}