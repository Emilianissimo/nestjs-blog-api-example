import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  imports: [
    JwtModule.register({
      secret: 'secretTestTemp',
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ]
})
export class UsersModule {}
