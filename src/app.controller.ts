import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('db/user')
  async createUser() {
    return await this.appService.createUser();
  }

  @Get('db/user')
  async getUser() {
    return await this.appService.getUserByEmail('teste@email.com');
  }
}
