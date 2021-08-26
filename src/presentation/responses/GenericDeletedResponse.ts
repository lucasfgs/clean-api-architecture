import { HttpResponse, HttpResponseHandler } from '@presentation/protocols/Http'

export class GenecricDeletedResponse implements HttpResponseHandler<void> {
  async response (): Promise<HttpResponse<void>> {
    const responseData = {
      statusCode: 204,
      body: undefined
    }

    return responseData
  }
}
