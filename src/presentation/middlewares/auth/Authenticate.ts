/* eslint-disable array-callback-return */
import { objectKeyExists } from '@application/helpers/objects/objectKeyExists'
import { Middleware } from '@application/protocols/middlewares/middleware'
import { MiddlewareRequestModel } from '@application/protocols/requests/Http'
import { Jwt } from '@application/protocols/security/Jwt'
import { IUser } from '@domain/models/IUser'
import { IUserRepository } from '@domain/repositories/IUserRepository'
import { UnauthorizedError } from '@application/errors/UnauthorizedError'

export class Authenticate implements Middleware {
  constructor (
        private readonly jwtAdapter: Jwt,
        private readonly userRepository: IUserRepository
  ) {
    this.jwtAdapter = jwtAdapter
    this.userRepository = userRepository
  }

  async handle (request: MiddlewareRequestModel, routePermission?: string, routeRoles?: string[]): Promise<void> {
    if (
      !objectKeyExists(request, 'headers') ||
      !objectKeyExists(request.headers, 'authorization')
    ) {
      throw new UnauthorizedError('Invalid request')
    }

    const { authorization } = request.headers

    const [, token] = authorization.split(/\s+/)

    const { id, role } = this.checkJwt(token)

    const user = await this.userRepository.findUserPermissionsById(id)

    const userPermissions = this.formatUserPermissions(user)

    if (!userPermissions.includes(routePermission)) { throw new UnauthorizedError('User has no permission') }

    if (routeRoles) {
      if (!routeRoles.includes(user.role.name)) { throw new UnauthorizedError('User has no permission') }
    }
    request.user = {
      id,
      role
    }
  }

  private checkJwt (token) {
    try {
      return this.jwtAdapter.verify(token)
    } catch (error) {
      throw new UnauthorizedError(error.message)
    }
  }

  private formatUserPermissions (user: IUser): string[] {
    const userPermissions = []

    user.role.permissionRoles.map(permissionRole => {
      permissionRole.create && userPermissions.push(`${permissionRole.permission.name}.create`)
      permissionRole.read && userPermissions.push(`${permissionRole.permission.name}.read`)
      permissionRole.update && userPermissions.push(`${permissionRole.permission.name}.update`)
      permissionRole.delete && userPermissions.push(`${permissionRole.permission.name}.delete`)
    })

    return userPermissions
  }
}
