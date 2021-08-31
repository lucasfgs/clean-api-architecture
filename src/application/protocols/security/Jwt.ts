
export interface Jwt{
    sign(payload: any): string
    verify(token: string): string
}
