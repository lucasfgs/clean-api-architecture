import bcrypt from 'bcrypt'
import { PasswordHashing } from '@application/protocols/security/PasswordHashing'

export class BCryptAdapter implements PasswordHashing {
    private readonly saltRounds = 5

    async hash (password: string): Promise<string> {
      return await bcrypt.hash(password, this.saltRounds)
    }

    async compare (password: string, hash: string): Promise<boolean> {
      return await bcrypt.compare(password, hash)
    }
}
