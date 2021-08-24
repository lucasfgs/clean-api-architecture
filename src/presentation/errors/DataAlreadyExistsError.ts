import { DefaultApplicationError } from './DefaultApplicationError'

export class DataAlreadyExistsError extends DefaultApplicationError {
    statusCode= 409;
    name = 'DataAlreadyExists';
}
