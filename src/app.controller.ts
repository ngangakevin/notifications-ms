import { Controller, Get, Logger, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  logger = new Logger(AppController.name);

  @Get()
  getTransaction(@Query() query) {
    if (!query.transId) {
      return { error: "please add querry param as '?transId=1212'" };
    }
    return this.appService.getTransaction(query.transId);
  }

  @MessagePattern('create_account')
  async handleNewAccount(data: any) {
    this.logger.log(data);
    return { Message: `Account ${data.accountNumber} has been created.` };
  }
}
