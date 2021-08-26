
export interface IDeletePermissionUseCase {
    delete(id: number): Promise<void>
}
