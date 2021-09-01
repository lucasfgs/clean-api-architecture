import { DefaultApplicationError } from './DefaultApplicationError'

export class UnauthorizedError extends DefaultApplicationError {
  name = 'UnauthorizedError';
  statusCode = 401;
}
