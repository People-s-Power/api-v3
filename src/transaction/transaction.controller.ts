import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TransactionService } from './transaction.service';

@Controller('api/v3/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Get()
  home() {
    return 'Welcome to verify';
  }
  @Get('verify/:reference')
  verify(@Param('reference') reference: string) {
    if (process.env.NODE_ENV === 'developement') {
      return this.transactionService.verifyPayment(reference);
    }
  }
  @Post('webhook')
  async webhook(@Body() body: any, @Res() res: Response) {
    await this.transactionService.webhook(body);
    return res.status(200);
  }
}
