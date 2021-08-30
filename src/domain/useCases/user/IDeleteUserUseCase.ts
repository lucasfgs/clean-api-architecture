export interface IDeleteUserUseCase {
    delete(id: number): Promise<void>
}
