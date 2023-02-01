import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './configs';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ACCOUNTS_SERVICE',
        useFactory: (configService: ConfigService) => {
          const microserviceOptions = configService.getMicroserviceConfig();
          return microserviceOptions;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
