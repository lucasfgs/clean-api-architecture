import { IPermission } from '@domain/models/IPermission'
import { ICreatePermissionRole, IPermissionRole, IUpdatePermissionRole } from '@domain/models/IPermissionRole'
import { IRole } from '@domain/models/IRole'
import { IPermissionRoleRepository } from '@domain/repositories/IPermissionRoleRepository'
import { PermissionRole } from '@infra/database/typeorm/entities/PermissionRole'
import { RepositoryError } from '@application/errors/RepositoryError'
import { TOrder } from '@application/protocols/requests/GenericFilterRequest'
import { getRepository, Repository } from 'typeorm'

export class PermissionRoleRepository implements IPermissionRoleRepository {
    private repository: Repository<PermissionRole>

    constructor () {
      this.repository = getRepository(PermissionRole)
    }

    async findAll (order: TOrder, limit: number, offset: number): Promise<IPermissionRole[]> {
      try {
        const permissionRoles = await this.repository.find({
          order: {
            id: order
          },
          skip: offset,
          take: limit
        })

        return permissionRoles
      } catch (error) {
        console.log(error)
        throw new RepositoryError('Could not find permission roles')
      }
    }

    async findByRole (role: IRole): Promise<IPermissionRole[]> {
      try {
        const permissionRoles = await this.repository.find({
          where: { role },
          relations: [
            'role',
            'permission'
          ]
        })

        return permissionRoles
      } catch (error) {
        console.log(error)
        throw new RepositoryError('Could not find permission roles')
      }
    }

    async findByPermissionAndRole (permission: IPermission, role: IRole) {
      try {
        return await this.repository.findOne({
          where: {
            permission,
            role
          }
        })
      } catch (error) {
        throw new RepositoryError('Could not permission role')
      }
    }

    async create (permissionRole: ICreatePermissionRole): Promise<IPermissionRole> {
      try {
        const permissionRoleCreated = await this.repository.create(permissionRole)

        return await this.repository.save(permissionRoleCreated)
      } catch (error) {
        throw new RepositoryError('Could not create permission role')
      }
    }

    async update (permissionRole: IUpdatePermissionRole): Promise<void> {
      try {
        await this.repository.update(permissionRole.id, { ...permissionRole, updatedAt: new Date() })
      } catch (error) {
        console.log(error)
        throw new RepositoryError('Could not update permission role')
      }
    }

    async delete (permissionId: number, roleId: number): Promise<void> {
      try {
        const permissionRole = await this.repository.findOne({
          where: {
            permission: permissionId,
            role: roleId
          }
        })

        await this.repository.remove(permissionRole)
      } catch (error) {
        throw new RepositoryError('Permission role does not exist')
      }
    }
}
