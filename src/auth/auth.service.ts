import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async signIn(username: string, password: string): Promise<{ access_token: string}> {
        const user = await this.userService.findByLogin(username);
        if(user?.password !== password) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, user: user};
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
