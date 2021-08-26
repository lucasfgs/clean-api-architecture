import { getRepository, Repository } from 'typeorm'
import { IPermission, ICreatePermission, IUpdatePermission } from '@domain/models/IPermission'
import { IPermissionRepository } from '@domain/repositories/IPermissionRepository'
import { Permission } from '@infra/database/typeorm/entities/Permission'
import { RepositoryError } from '@presentation/errors/RepositoryError'

export class PermissionRepository implements IPermissionRepository {
  private repository: Repository<Permission>

  constructor () {
    this.repository = getRepository(Permission)
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

  async findAll (order: 'DESC' | 'ASC', limit: number, offset: number): Promise<IPermission[]> {
    try {
      // TODO: make pagination and return all data
      const [list, number] = await this.repository.findAndCount({
        order: {
          name: order
        },
        skip: offset,
        take: limit
      })

      console.log(number)

      return list
    } catch (error) {
      throw new RepositoryError('Could not find permission')
    }
  }

  async create (permissionModel: ICreatePermission): Promise<IPermission> {
    try {
      const permission = this.repository.create(permissionModel)

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
}
