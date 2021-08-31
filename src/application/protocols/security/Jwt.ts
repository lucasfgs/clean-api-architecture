import { SignedToken } from '@domain/models/IToken'

export interface Jwt{
    sign(payload: any): string
    verify(token: string): SignedToken
}
