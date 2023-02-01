// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private transactionsClient: ClientProxy,
  ) {}

  getTransaction(transId: string) {
    return this.transactionsClient.send('get_transaction', transId);
  }
}
