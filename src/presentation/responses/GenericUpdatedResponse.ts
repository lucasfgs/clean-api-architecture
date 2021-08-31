import { HttpResponse, HttpResponseHandler } from '@application/protocols/requests/Http'

export class GenericUpdatedResponse implements HttpResponseHandler<void> {
  async response (): Promise<HttpResponse<void>> {
    const responseData = {
      statusCode: 204,
      body: undefined
    }

    return responseData
  }
}
