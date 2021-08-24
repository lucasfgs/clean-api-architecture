
export interface IPermission {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ICreatePermission = Omit<IPermission, 'id' | 'createdAt' | 'updatedAt' >
