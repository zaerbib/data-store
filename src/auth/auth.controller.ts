import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorator/public.decorator';
import { Roles } from '../common/decorator/roles.decorator';
import { PublicGuard } from '../common/guards/public.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@UseGuards(PublicGuard, RolesGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  @Roles(['user', 'admin'])
  async getProfile(@Request() req) {
    return req.user;
  }
}
