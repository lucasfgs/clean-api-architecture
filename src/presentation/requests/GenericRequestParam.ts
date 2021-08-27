import { HttpRequest } from '@presentation/protocols/Http'

export type TGenericRequestParam<B, P = {id: number}> = HttpRequest<B, P>
