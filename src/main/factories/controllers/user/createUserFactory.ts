import { RoleRepository } from '@application/repositories/RoleRepository'
import { UserRepository } from '@application/repositories/UserRepository'
import { CreateUserUseCase } from '@application/useCases/user/CreateUserUseCase'
import { UserRequiredFieldsValidation } from '@application/validation/user/leaf/UserRequiredFieldsValidation'
import { IUser } from '@domain/models/IUser'
import { CreateUserController } from '@presentation/controllers/user/CreateUserController'
import { GenericCreatedResponse } from '@presentation/responses/GenericCreatedResponse'

export const createUserFactory = () => {
  const userValidation = new UserRequiredFieldsValidation()

  const userRepository = new UserRepository()
  const roleRepository = new RoleRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository, roleRepository, userValidation)

  const createUserPresenter = new GenericCreatedResponse<IUser>()
  const createUserController = new CreateUserController(createUserUseCase, createUserPresenter)

  return {
    userRepository,
    createUserUseCase,
    createUserPresenter,
    createUserController
  }
}
