import { HttpResponse, HttpResponseHandler } from '../../application/protocols/requests/Http'

export class GenericCreatedResponse<T> implements HttpResponseHandler<T> {
  async response (body: T): Promise<HttpResponse<T>> {
    return {
      statusCode: 201,
      body
    }
  }
}
