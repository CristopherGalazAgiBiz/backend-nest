import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloAleman(): string {
    return 'hola aleman';
  }

  getHelloChile(): string {
    return 'wena compare';
  }
}
