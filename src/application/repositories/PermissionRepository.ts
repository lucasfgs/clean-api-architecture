import { getRepository, Repository } from 'typeorm'
import { IPermission, ICreatePermission, IUpdatePermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { Permission } from '@infra/database/typeorm/entities/Permission'
import { RepositoryError } from '@application/errors/RepositoryError'
import { DefaultApplicationError } from '@application/errors/DefaultApplicationError'
import { DataAlreadyExistsError } from '@application/errors/DataAlreadyExistsError'
import { TOrder } from '@application/protocols/requests/GenericFilterRequest'

export class PermissionRepository implements IPermissionRepository {
  private repository: Repository<Permission>

  constructor () {
    this.repository = getRepository(Permission)
  }

  async findByName (name: string): Promise<IPermission> {
    try {
      const permission = await this.repository.findOne({
        where: {
          name
        }
      })

      return permission
    } catch (error) {
      throw new RepositoryError('Could not find permission')
    }
  }

  async findAll (order: TOrder, limit: number, offset: number): Promise<IPermission[]> {
    try {
      const permissions = await this.repository.find({
        order: {
          name: order
        },
        skip: offset,
        take: limit
      })

      return permissions
    } catch (error) {
      console.log(error)
      throw new RepositoryError('Could not find permission')
    }
  }

  async create (permissionModel: ICreatePermission): Promise<IPermission> {
    try {
      const permission = await this.repository.create(permissionModel)

      return this.repository.save(permission)
    } catch (error) {
      throw new RepositoryError('Could not create permission')
    }
  }

  async update (permissionModel: IUpdatePermission): Promise<void> {
    try {
      await this.repository.update(permissionModel.id, { ...permissionModel, updatedAt: new Date() })
    } catch (error) {
      throw new RepositoryError('Could not update permission')
    }
  }

  async delete (id: number): Promise<void> {
    try {
      const deletedPermission = await this.repository.delete(id)

      if (deletedPermission.affected === 0) throw new DataAlreadyExistsError('Permission does not exist')
    } catch (error) {
      if (error instanceof DefaultApplicationError) throw error

      throw new RepositoryError('Could not delete permission')
    }
  }
}
