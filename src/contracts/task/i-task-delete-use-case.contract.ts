export interface ITaskDeleteUseCase {
    delete(id: number): Promise<void>
}