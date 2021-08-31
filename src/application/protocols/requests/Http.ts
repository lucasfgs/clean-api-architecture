import { SignedToken } from '@domain/models/IToken'

export type HttpResponse<T> = {
    statusCode: number,
    body: T;
}

export interface HttpResponseHandler<T = any> {
    response(body: T): Promise<HttpResponse<T>>
}

export interface HttpRequest<
  Body = any,
  Params = Body,
  Query = Body,
  Headers = Body
> {
  body?: Body;
  params?: Params;
  query?: Query;
  headers?: Headers;
  user?: SignedToken;
}

export interface MiddlewareRequestModel extends HttpRequest {
  method?: string
}
