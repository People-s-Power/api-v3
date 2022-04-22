import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return this.appService.getHello();
  }

  @Get('api/v3')
  renderV3() {
    return `<h1>Welcome to V3.1e</h1>`;
  }
  @Post('api/v3/convert')
  async conver(@Body() input: { currency: string }) {
    return this.appService.conver(input.currency);
  }
}
