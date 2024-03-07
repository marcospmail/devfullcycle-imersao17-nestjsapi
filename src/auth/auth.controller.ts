import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body

    return this.authService.login(username, password)
  }
}
