import { HttpRequest } from '@application/protocols/requests/Http'

export type TOrder = 'DESC' | 'ASC'

export interface IGenericFilterRequestQuery {
    order?: TOrder;
    limit?: number;
    offset?: number;
}

export type TGenericFilterRequest = HttpRequest<
void,
void,
IGenericFilterRequestQuery
>
