import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/helpers/constants.helper';
import { JwtStrategy } from './validators/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ]
})
export class UsersModule {}
