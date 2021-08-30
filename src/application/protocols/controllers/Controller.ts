import { HttpRequest, HttpResponse } from '../requests/Http'

export interface Controller<T = unknown> {
    handle(request: HttpRequest): Promise<HttpResponse<T>>
}
