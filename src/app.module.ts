import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperacionesController } from './operaciones/operaciones.controller';
import { OperacionesService } from './operaciones/operaciones.service';

@Module({
  imports: [],
  controllers: [AppController, OperacionesController],
  providers: [AppService, OperacionesService],
})
export class AppModule {}
