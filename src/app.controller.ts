import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTransaction(@Query() query) {
    if(!query.transId){
      return {error: "please add querry param as '?transId=1212'"};
    }
    return this.appService.getTransaction(query.transId);
  }
}
