require('dotenv').config();

import { Injectable } from '@nestjs/common';
import { ClientOptions, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

const clientOptions : ClientOptions = {
    transport: Transport.REDIS,
    options: {
      port: parseInt(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST,
      retryAttempts: parseInt(process.env.REDIS_CONNECTION_RETRY),
      retryDelay: parseInt(process.env.REDIS_CONNECTION_RETRY_BACKOFF)
    }
}

@Injectable()
export class AppService{
  private readonly transactionsClient: ClientProxy;

  constructor() {
    this.transactionsClient = ClientProxyFactory.create(clientOptions);
  }

  getTransaction(transId: string) {
    return this.transactionsClient.send('get_transaction', transId);
  }
}
