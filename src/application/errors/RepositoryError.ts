import { DefaultApplicationError } from './DefaultApplicationError'

export class RepositoryError extends DefaultApplicationError {
  name = 'RepositoryError';
  statusCode = 500;
}
