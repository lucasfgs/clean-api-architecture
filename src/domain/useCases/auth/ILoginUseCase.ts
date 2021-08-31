import { IUserLoginRequest, IUserLoginResponse } from '@domain/models/IUser'

export interface ILoginUseCase {
    login(requestModel: IUserLoginRequest): Promise<IUserLoginResponse>
}
