import { HttpRequest, HttpResponse } from './Http'

export interface Controller<T = unknown> {
    handle(request: HttpRequest): Promise<HttpResponse<T>>
}
