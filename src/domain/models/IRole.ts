import { IPermission } from './IPermission'
import { IUser } from './IUser'

export interface IRole {
    id: number
    name: string
    users?: IUser[]
    createdAt?: Date
    updatedAt?: Date
}

export type ICreateRole = Omit<IPermission, 'id' | 'createdAt' | 'updatedAt' | 'users'>

export type IUpdateRole = Omit<IPermission, 'createdAt' | 'updatedAt' | 'users'>
