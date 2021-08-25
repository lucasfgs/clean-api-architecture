import { HttpRequest } from '@presentation/protocols/Http'

export type IGenericFilterRequest = HttpRequest<
void,
void,
{
    order?: 'DESC' | 'ASC',
    limit?: number,
    offset?: number
}
>
