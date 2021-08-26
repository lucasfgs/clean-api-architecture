export interface IDeleteRoleUseCase {
    delete(id: number): Promise<void>
}
