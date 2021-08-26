
export interface IPermission {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ICreatePermission = Omit<IPermission, 'id' | 'createdAt' | 'updatedAt' >

export type IUpdatePermission = Omit<IPermission, 'createdAt' | 'updatedAt' >

export type IPermissionParams = Pick<IPermission, 'id'>
