import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Headers() headers: any): object {
    return this.appService.getRouteMap(headers.host);
  }
}
