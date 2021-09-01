import { DefaultApplicationError } from './DefaultApplicationError'

export class RequestValidationError extends DefaultApplicationError {
    statusCode= 400
    name = 'RequestValidationError'
}
