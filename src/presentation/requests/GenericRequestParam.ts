import { HttpRequest } from '@presentation/protocols/Http'

export type TGenericRequestParam<T> = HttpRequest<T, {id: number}>
