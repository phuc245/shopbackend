import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/login')
  loginUser(@Body() login: LoginDto) {
    return this.authService.validateUser(login);
  }

  // dang nhap customer
  @Post('customers/login')
  loginCustomer(@Body() login: LoginDto) {
    return this.authService.validateCustomer(login);
  }
}
