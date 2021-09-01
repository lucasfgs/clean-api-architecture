import { ICreateUser, IUser, IUpdateUser } from '@domain/models/IUser'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { User } from '@infra/database/typeorm/entities/User'
import { DefaultApplicationError } from '@application/errors/DefaultApplicationError'
import { RepositoryError } from '@application/errors/RepositoryError'
import { TOrder } from '@application/protocols/requests/GenericFilterRequest'
import { getRepository, Repository } from 'typeorm'

export class UserRepository implements IUserRepository {
    private repository: Repository<User>

    constructor () {
      this.repository = getRepository(User)
    }

    async findAll (order: TOrder, limit: number, offset: number): Promise<IUser[]> {
      try {
        const user = await this.repository.find({
          order: {
            name: order
          },
          skip: offset,
          take: limit
        })

        return user
      } catch (error) {
        throw new RepositoryError('Could not find users')
      }
    }

    async findByEmail (email: string): Promise<IUser> {
      try {
        return await this.repository.findOne({ select: ['id', 'password'], where: { email }, relations: ['role'] })
      } catch (error) {
        throw new RepositoryError('Could not find user')
      }
    }

    async findUserPermissionsById (id: number): Promise<IUser> {
      try {
        return await this.repository.findOne({ select: ['id', 'password'], where: { id }, relations: ['role', 'role.permissionRoles', 'role.permissionRoles.permission'] })
      } catch (error) {
        throw new RepositoryError('Could not find user')
      }
    }

    async create (user: ICreateUser): Promise<IUser> {
      try {
        const createdUser = await this.repository.create(user)

        return await this.repository.save(createdUser)
      } catch (error) {
        throw new RepositoryError('Could not create user')
      }
    }

    async update (user: IUpdateUser): Promise<void> {
      try {
        await this.repository.update(user.id, { ...user, updatedAt: new Date() })
      } catch (error) {
        throw new RepositoryError('Could not update user')
      }
    }

    async delete (id: number): Promise<void> {
      try {
        const deteledRole = await this.repository.delete(id)

        if (deteledRole.affected === 0) throw new RepositoryError('User does not exist')
      } catch (error) {
        if (error instanceof DefaultApplicationError) throw error

        throw new RepositoryError('Could not delete user')
      }
    }
}
