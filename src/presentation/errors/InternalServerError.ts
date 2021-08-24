import { DefaultApplicationError } from './DefaultApplicationError'

export class InternalServerError extends DefaultApplicationError {
    statusCode: 500
    name: 'InternalServerError'
}
