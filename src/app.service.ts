import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola World!';
  }

  getHelloAleman(): string {
    return 'hola aleman';
  }
}
