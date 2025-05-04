import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './controllers/task/task.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [TaskModule, InfraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
