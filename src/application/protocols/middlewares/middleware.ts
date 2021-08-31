import { MiddlewareRequestModel } from '../requests/Http'

export interface Middleware {
    handle(request: MiddlewareRequestModel, routePermission?: string, routeRole?: string[]): Promise<void>
}
