import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDTO } from './dtos/create-user.dto';
import { LoginUserDTO } from './dtos/login-user.dto';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    public async signup(body: CreateUserDTO) {
        const usersAr = await this.usersService.findByEmail(body.email);
        if (usersAr.length) {
            throw new UnprocessableEntityException('User with the same email is already exists!');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(body.password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        const user = await this.usersService.store(body, result);

        return {
            access_token: this.jwtService.sign({
                username: user.name,
                sub: user.id
            })
        };
    }

    public async signin(body: LoginUserDTO) {
        const [user] = await this.usersService.findByEmail(body.email);
        if (!user) {
            throw new UnprocessableEntityException('User with the same email is already exists!');
        }

        const [salt, hash] = user.password.split('.')

        const incomingHash = (await scrypt(body.password, salt, 32)) as Buffer;

        if(incomingHash.toString('hex') !== hash) {
            throw new UnprocessableEntityException('Incorrect email or password');
        }

        return {
            access_token: this.jwtService.sign({
                username: user.name,
                sub: user.id
            })
        };
    }
}
