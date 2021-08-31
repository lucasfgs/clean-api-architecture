import { RoleRepository } from '@application/repositories/RoleRepository'
import { UserRepository } from '@application/repositories/UserRepository'
import { UpdateUserUseCase } from '@application/useCases/user/UpdateUserUseCase'
import { UserRequiredFieldsValidation } from '@application/validation/user/leaf/UserRequiredFieldsValidation'
import { UpdateUserController } from '@presentation/controllers/user/UpdateUserController'
import { GenericUpdatedResponse } from '@presentation/responses/GenericUpdatedResponse'

export const updateUsersFactory = () => {
  const userValidation = new UserRequiredFieldsValidation()

  const userRepository = new UserRepository()
  const roleRepository = new RoleRepository()

  const updateUserUseCase = new UpdateUserUseCase(userRepository, roleRepository, userValidation)

  const updateUserPresenter = new GenericUpdatedResponse()
  const updateUserController = new UpdateUserController(updateUserUseCase, updateUserPresenter)

  return {
    userRepository,
    updateUserUseCase,
    updateUserPresenter,
    updateUserController
  }
}
