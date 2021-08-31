import jsonwebtoken from 'jsonwebtoken'
import { Jwt } from '@application/protocols/security/Jwt'
import { SignedToken } from '@domain/models/IToken'

export class JwtAdapter implements Jwt {
  constructor (
        private readonly secret: string,
        private readonly tokenExpirationInSeconds:number
  ) {
    this.secret = secret
    this.tokenExpirationInSeconds = tokenExpirationInSeconds
  }

  sign (payload: any): string {
    return jsonwebtoken.sign(payload, this.secret, {
      expiresIn: this.tokenExpirationInSeconds
    })
  }

  verify (token: string): SignedToken {
    return jsonwebtoken.verify(token, this.secret) as SignedToken
  }
}

const secret = process.env.JWT_SECRET as string

const expirationTimeInSeconds = parseInt(process.env.JWT_EXPIRATION_TIME_IN_SECONDS as string)

export const jwtAdapterSingleton = new JwtAdapter(secret, expirationTimeInSeconds)
