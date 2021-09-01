import { DefaultApplicationError } from './DefaultApplicationError'

export class BadRequestError extends DefaultApplicationError {
  name = 'BadRequestError';
  statusCode = 400;
}
