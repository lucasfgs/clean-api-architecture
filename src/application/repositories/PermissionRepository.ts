import { getRepository, Repository } from 'typeorm'
import { IPermission, ICreatePermission } from '@data/models/IPermission'
import { IPermissionRepository } from '@data/repositories/IPermissionRepository'
import { Permission } from '@infra/database/typeorm/entities/Permission'

export class PermissionRepository implements IPermissionRepository {
  private repository: Repository<Permission>

  constructor () {
    this.repository = getRepository(Permission)
  }

  async create (permissionModel: ICreatePermission): Promise<IPermission> {
    const permission = this.repository.create(permissionModel)

    return this.repository.save(permission)
  }

  async findByName (name: string): Promise<IPermission> {
    const permission = this.repository.findOne({
      where: {
        name
      }
    })

    return permission
  }
}
