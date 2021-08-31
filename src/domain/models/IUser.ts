import { Role } from '@infra/database/typeorm/entities/Role'

export interface IUser {
    id?: number
    name?: string
    email?: string
    password?: string
    role?: Role;
    createdAt?: Date
    updatedAt?: Date | null
}

export type ICreateUser = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>

export type IUpdateUser = Omit<IUser, 'createdAt' | 'updatedAt'>

export type IUserLoginRequest = Pick<IUser, 'email' | 'password'>

export interface IUserLoginResponse {
    token: string
}
