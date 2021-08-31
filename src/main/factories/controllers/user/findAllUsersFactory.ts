import { UserRepository } from '@application/repositories/UserRepository'
import { FindAllUsersUseCase } from '@application/useCases/user/FindAllUsersUseCase'
import { FilterValidation } from '@application/validation/common/leaf/FilterValidation'
import { IUser } from '@domain/models/IUser'
import { FindAllUsersController } from '@presentation/controllers/user/FindAllUsersController'
import { GenericSuccessResponse } from '@presentation/responses/GenericSuccessResponse'

export const findAllUsersFactory = () => {
  const permissionValidation = new FilterValidation()
  const userRepository = new UserRepository()
  const findAllUserUseCase = new FindAllUsersUseCase(userRepository, permissionValidation)

  const findAllUsersPresenter = new GenericSuccessResponse<IUser[]>()
  const findAllUsersController = new FindAllUsersController(findAllUserUseCase, findAllUsersPresenter)

  return {
    userRepository,
    findAllUserUseCase,
    findAllUsersPresenter,
    findAllUsersController
  }
}
