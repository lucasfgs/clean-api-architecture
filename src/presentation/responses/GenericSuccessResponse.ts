import { HttpResponse, HttpResponseHandler } from '../../application/protocols/requests/Http'

export class GenericSuccessResponse<T> implements HttpResponseHandler<T> {
  async response (body: T): Promise<HttpResponse<T>> {
    return {
      statusCode: 200,
      body
    }
  }
}
