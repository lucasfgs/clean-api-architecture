
export interface IPermission {
    id?: number;
    name: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type IPermissionCreate = Omit<IPermission, 'id' | 'createdAt' | 'updatedAt' >
