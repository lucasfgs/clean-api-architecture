import { getRepository, Repository } from 'typeorm'
import { IPermission, ICreatePermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { Permission } from '@infra/database/typeorm/entities/Permission'
import { RepositoryError } from '@presentation/errors/RepositoryError'

export class PermissionRepository implements IPermissionRepository {
  private repository: Repository<Permission>

  constructor () {
    this.repository = getRepository(Permission)
  }

  async create (permissionModel: ICreatePermission): Promise<IPermission> {
    try {
      const permission = this.repository.create(permissionModel)

      return this.repository.save(permission)
    } catch (error) {
      throw new RepositoryError('Could not create permission')
    }
  }

  async findByName (name: string): Promise<IPermission> {
    try {
      const permission = this.repository.findOne({
        where: {
          name
        }
      })

      return permission
    } catch (error) {
      throw new RepositoryError('Could not find permission')
    }
  }
}
