import { Role } from '@infra/database/typeorm/entities/Role'

export interface IUser {
    id?: number
    name?: string
    email?: string
    password?: string
    createdAt?: Date
    updatedAt?: Date | null
    role?: Role;
}
