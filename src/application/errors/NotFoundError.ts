import { DefaultApplicationError } from './DefaultApplicationError'

export class NotFoundError extends DefaultApplicationError {
  statusCode = 404;
  name = 'NotFoundError';
}
