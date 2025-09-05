import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config, configSchema, enviroments } from './config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { PrismaService } from './infra/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV ?? 'development'] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
