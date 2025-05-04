import { TaskEntity } from "src/entities/task.entity"

export interface IBaseContract {
    create(entity: any): Promise<void | any>
    update(id: any, entity: any): Promise<void | any>
    delete(id: any): Promise<void>
    getAll(): Promise<any[]>
    getById(id: any): Promise<any>
}