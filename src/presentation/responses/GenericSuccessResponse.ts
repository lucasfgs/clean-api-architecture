import { HttpResponse, HttpResponseHandler } from '../protocols/Http'

export class GenericSuccessResponse<T> implements HttpResponseHandler<T> {
  async response (body: T): Promise<HttpResponse<T>> {
    return {
      statusCode: 200,
      body
    }
  }
}
