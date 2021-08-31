import jsonwebtoken from 'jsonwebtoken'
import { Jwt } from '@application/protocols/security/Jwt'

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

  verify (token: string): string {
    return jsonwebtoken.verify(token, this.secret) as string
  }
}

const secret = process.env.JWT_SECRET as string

const expirationTimeInSeconds = parseInt(process.env.JWT_EXPIRATION_TIME_IN_SECONDS as string)

export const JwtAdapterSingleton = new JwtAdapter(secret, expirationTimeInSeconds)
