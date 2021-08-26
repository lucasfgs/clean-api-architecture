export interface IDeletePermissionRoleUseCase {
    delete(permissionId: number, roleId: number): Promise<void>
}
