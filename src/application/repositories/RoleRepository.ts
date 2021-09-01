import { ICreateRole, IRole, IUpdateRole } from '@domain/models/IRole'
import { IRoleRepository } from '@domain/repositories/IRoleRepository'
import { Role } from '@infra/database/typeorm/entities/Role'
import { DefaultApplicationError } from '@application/errors/DefaultApplicationError'
import { NotFoundError } from '@application/errors/NotFoundError'
import { RepositoryError } from '@application/errors/RepositoryError'
import { TOrder } from '@application/protocols/requests/GenericFilterRequest'
import { getRepository, Repository } from 'typeorm'

export class RoleRepository implements IRoleRepository {
    private repository: Repository<Role>

    constructor () {
      this.repository = getRepository(Role)
    }

    async findByName (name: string): Promise<IRole> {
      return await this.repository.findOne({ where: { name } })
    }

    async findById (id: number): Promise<IRole> {
      return await this.repository.findOne(id)
    }

    async findAll (order: TOrder, limit: number, offset: number): Promise<IRole[]> {
      try {
        const roles = await this.repository.find({
          order: {
            name: order
          },
          skip: offset,
          take: limit
        })

        return roles
      } catch (error) {
        throw new RepositoryError('Could not find role')
      }
    }

    async create (role: ICreateRole): Promise<IRole> {
      try {
        const createdRole = await this.repository.create(role)

        return await this.repository.save(createdRole)
      } catch (error) {
        throw new RepositoryError('Could not create role')
      }
    }

    async update (role: IUpdateRole): Promise<void> {
      try {
        await this.repository.update(role.id, { ...role, updatedAt: new Date() })
      } catch (error) {
        throw new RepositoryError('Could not update role')
      }
    }

    async delete (id: number): Promise<void> {
      try {
        const deteledRole = await this.repository.delete(id)

        if (deteledRole.affected === 0) throw new NotFoundError('Role does not exist')
      } catch (error) {
        if (error instanceof DefaultApplicationError) throw error

        throw new RepositoryError('Could not delete role')
      }
    }
}
