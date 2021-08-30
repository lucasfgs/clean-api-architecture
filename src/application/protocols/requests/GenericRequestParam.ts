import { HttpRequest } from '@application/protocols/requests/Http'

export type TGenericRequestParam<B, P = {id: number}> = HttpRequest<B, P>
