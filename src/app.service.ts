import { Injectable } from '@nestjs/common';

require('dotenv').config();

@Injectable()
export class AppService {
  getRouteMap(host: string): object {
    const hostname = process.env["SCHEMA"] + host;
    return {
      posts:  hostname + "/api/posts/",
      categories: hostname + "/api/categories",
      users: hostname + "/api/users",
    };
  }
}
