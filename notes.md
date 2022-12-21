# Project init
```bash
npm init -y
# npm install @nestjs/common@7.6.17 @nestjs.core@7.6.17 @nestjs/platform-express@7.6.17 typescript@4.3.2
npm install @nestjs/typeorm typeorm sqlite3 pg cross-env @nestjs/config
npm install reflect-metadata@0.1.13 
# npm install -g @nestjs/cli
npm install class-validator class-transformer
nest new <app_name>
# Authentication
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

# Useful commands

```bash
nest generate module <name_without_word_module>
nest generate controller <name_without_word_controller>
nest generate service <name_without_word_service>
```
The same for pipe, ...
# Request and route data

```typescript
    @Body()
    // for body
    @Query()
    // for query string in get
    @Param('id', 'key')
    // for getting params like :id, :key
    @Headers()
    // for getting headers
```

# Notes

- DI instanses are internal by default (Singletone)
- As expected UNIT testing is not for controllers, only integrational end-to-end

# TypeORM

- Generates repositories by providing entities (in three diff ways)
- - has main methods: create, save, find, findOne, remove (also insert, update instead of save, remove or delete, seems like for optimization needs)
- Can be used in sync mode for development for auto migrating database from entity (like django)

# Testing

```bash
    npm run test:watch # unit
    npm run test:e2e # end2end
```
- Integrational testing skips dependencies and main.ts file in that case we need to connect them inside (cookie session, pipe validation and etc.)

# ENVS
Via setting different envs, you can choose which env set (.env file) you need to use by simple adding Nest recommended way and change scripts section of package.json file:
```json
    ...
    "scripts": {
        "prebuild": "rimraf dist",
        "build": "nest build",
        "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
        "start": "cross-env NODE_ENV=development nest start",
        "start:dev": "cross-env NODE_ENV=development nest start --watch",
        "start:debug": "cross-env NODE_ENV=development nest start --debug --watch",
        "start:prod": "node dist/main",
        "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
        "test": "cross-env NODE_ENV=test jest",
        "test:watch": "cross-env NODE_ENV=test jest --watch",
        "test:cov": "cross-env NODE_ENV=test jest --coverage",
        "test:debug": "cross-env NODE_ENV=test node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
        "test:e2e": "cross-env NODE_ENV=test jest --config ./test/jest-e2e.json"
    },
    ...
```


# Additional libraries
```bash
    npm install cookie-session @types/cookie-session
```

# Additional

File uploading and storing
-
https://stackoverflow.com/questions/61434084/saving-files-in-file-system-in-nestjs

Many to many examples
-
https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations

# JWT
Strategy validate func returns actual request.user object. If you need something there, just update it:
```ts
async validate(payload: any) {
    // Generate request.user object here
    const user = await this.usersService.getOne(payload.sub);
    return { userId: payload.sub, username: payload.username, is_admin: user.is_admin};
}
```
After that it can be used in the guard that extends AuthGuard('jwt') in hadnleRequest function:
```ts
import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        const request = context.switchToHttp().getRequest();
        return super.canActivate(context);
      }
    
      handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        if(!user.is_admin) {
          throw new ForbiddenException();
        }
        return user;
      }
}
```


# FAQ

- What is shared module? -> Each module that using as singletone into DI.
- Dynamic modules -> those are just modules, which can be created dynamically, like DB module and we providing list of providers, list of exports, type of database and others.
```ts
// Simple example
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```
- forRoot is using as constructor, where we will pass entities
Need to be implemented, if we want to have optional type and count of entities, loading from other modules and also can pass the options, like
```ts
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}
```
### Example of use
```ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

- Lazy loading, this is just for load modules somewhen after application started, in case of all modules are loading eager meanwhile application starting, even if they are not needed right now and this is bad for optimization.
- Scopes are can be:

| DEFAULT | working as singletone across all application |
| REQUEST | instance created exclusively for current request and garbage collecting |
| TRANSIENT | each provider will have new instance |
This can be written as Injectable option:
```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {}
```
Or as prop of provider register:
```ts
{
  provide: 'CACHE_MANAGER',
  useClass: CacheManager,
  scope: Scope.TRANSIENT,
}
```
- Custom exceptions -> to create them, we need just to extend Exception class, like:
```ts
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```
