import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

const USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
  },
]

@Injectable()
export class AuthService {
  // In your service or controller
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    const userFound = USERS.find(
      (user) => user.username === username && user.password === password,
    )

    if (!userFound) {
      throw new UnauthorizedException()
    }

    const payload = { sub: userFound.id, username: userFound.username }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
