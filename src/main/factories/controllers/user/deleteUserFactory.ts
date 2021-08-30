import { UserRepository } from '@application/repositories/UserRepository'
import { DeleteUserUseCase } from '@application/useCases/user/DeleteUserUseCase'
import { IdParamValidation } from '@application/validation/common/leaf/IdParamValidation'
import { DeleteUserController } from '@presentation/controllers/user/DeleteUserController'
import { GenecricDeletedResponse } from '@presentation/responses/GenericDeletedResponse'

export const deleteUserFactory = () => {
  const userValidation = new IdParamValidation()
  const userRepository = new UserRepository()
  const deleteUserUseCase = new DeleteUserUseCase(userRepository, userValidation)

  const deleteUserPresenter = new GenecricDeletedResponse()
  const deleteUserController = new DeleteUserController(deleteUserUseCase, deleteUserPresenter)

  return {
    UserRepository,
    deleteUserUseCase,
    deleteUserPresenter,
    deleteUserController
  }
}
