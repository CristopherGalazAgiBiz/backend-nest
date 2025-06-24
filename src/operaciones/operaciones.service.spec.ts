import { Test, TestingModule } from '@nestjs/testing';
import { OperacionesService } from './operaciones.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('OperacionesService', () => {
  let service: OperacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperacionesService],
    }).compile();

    service = module.get<OperacionesService>(OperacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //SUMA
  it('operacion deberia sumar', () => {
    let a: any = 10;
    let b = 30;

    expect(service.operar('suma', a, b)).toBe(40);

    a = -10;
    b = 50;
    expect(service.operar('suma', a, b)).toBe(40);

    a = -10;
    b = -50;
    expect(service.operar('suma', a, b)).not.toBe(-100);

    a = Math.PI;
    b = 30;
    expect(service.operar('suma', a, b)).toBeCloseTo(33.14, 2);

    a = null;
    b = 50;
    expect(service.operar('suma', a, b)).toBeNaN();

    a = '10';
    b = 50;
    expect(service.operar('suma', a, b)).toBeNaN();

    a = undefined;
    b = 50;
    expect(() => {
      service.operar('suma', a, b);
    }).toThrow('No se puede llamar con numeros indefinidos.');
  });

  //RESTA
  it('operacion deberia restar', () => {
    let a: any = 10;
    let b = 30;

    expect(service.operar('resta', a, b)).toBe(-20);

    a = 10;
    b = 50;
    expect(service.operar('resta', a, b)).toBe(-40);

    a = 60;
    b = 50;
    expect(service.operar('resta', a, b)).not.toBe(20);

    a = Math.PI;
    b = 30;
    expect(service.operar('resta', a, b)).toBeCloseTo(-26.86, 2);

    a = null;
    b = 50;
    expect(service.operar('resta', a, b)).toBeNaN();

    a = '10';
    b = 50;
    expect(service.operar('resta', a, b)).toBeNaN();

    a = undefined;
    b = 50;
    expect(() => {
      service.operar('resta', a, b);
    }).toThrow('No se puede llamar con numeros indefinidos.');
  });

  //MULTIPLICAR
  it('operacion deberia multiplicar', () => {
    let a: any = 3;
    let b = 3;

    expect(service.operar('multiplicacion', a, b)).toBe(9);

    a = 2;
    b = 50;
    expect(service.operar('multiplicacion', a, b)).toBe(100);

    a = 5;
    b = 5;
    expect(service.operar('multiplicacion', a, b)).not.toBe(30);

    a = null;
    b = 50;
    expect(service.operar('multiplicacion', a, b)).toBeNaN();

    a = '10';
    b = 50;
    expect(service.operar('multiplicacion', a, b)).toBeNaN();

    a = undefined;
    b = 50;
    expect(() => {
      service.operar('multiplicacion', a, b);
    }).toThrow('No se puede llamar con numeros indefinidos.');
  });

  //DIVISION
  it('operacion deberia dividir', () => {
    let a: any = 6;
    let b = 2;

    expect(service.operar('division', a, b)).toBe(3);

    a = 50;
    b = 2;
    expect(service.operar('division', a, b)).toBe(25);

    a = 100;
    b = 5;
    expect(service.operar('division', a, b)).not.toBe(10);

    a = null;
    b = 50;
    expect(service.operar('division', a, b)).toBeNaN();

    a = '10';
    b = 50;
    expect(service.operar('division', a, b)).toBeNaN();

    a = undefined;
    b = 50;
    expect(() => {
      service.operar('division', a, b);
    }).toThrow('No se puede llamar con numeros indefinidos.');
  });

  //POTENCIA
  it('operacion deberia elevar un numero', () => {
    let a: any = 2;
    let b = 2;

    expect(service.potencia(a, b)).toBe(4);

    a = 3;
    b = 3;
    expect(service.potencia(a, b)).toBe(27);

    a = 4;
    b = 4;
    expect(service.potencia(a, b)).not.toBe(255);

    a = null;
    b = 50;
    expect(service.potencia(a, b)).toBeNaN();

    a = '10';
    b = 50;
    expect(service.potencia(a, b)).toBeNaN();

    a = undefined;
    b = 50;
    expect(() => {
      service.potencia(a, b);
    }).toThrow('No se puede llamar con numeros indefinidos.');
  });

  //FACTORIAL
  it('operacion deberia obtener el factorial un numero', () => {
    let a: any = 2;

    expect(service.factorial(a)).toBe(2);

    a = 3;
    expect(service.factorial(a)).toBe(6);

    a = 4;
    expect(service.factorial(a)).not.toBe(25);

    a = null;
    expect(service.factorial(a)).toBeNaN();

    a = '10';
    expect(service.factorial(a)).toBeNaN();

    a = undefined;
    expect(() => {
      service.factorial(a);
    }).toThrow('No se puede llamar con numeros indefinidos.');
  });
});

describe('OperacionesController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // SUMA
  it('/operaciones (GET)', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'suma', a: 100, b: 100 })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((response) => {
          expect(response.body.resultado).toBe(200);
        });
    });

    it('/operaciones (GET) error por valor no numérico', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'suma', a: 'numero', b: 100 })
        .expect(502)
    });

  // RESTA
  it('/operaciones (GET)', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'resta', a: 100, b: 50 })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((response) => {
          expect(response.body.resultado).toBe(50);
        });
    });

    it('/operaciones (GET) error por valor no numérico', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'resta', a: 'numero', b: 100 })
        .expect(502)
    });

  // MULTIPLICACIÓN
  it('/operaciones (GET)', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'multiplicacion', a: 100, b: 2 })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((response) => {
          expect(response.body.resultado).toBe(200);
        });
    });

    it('/operaciones (GET) error por valor no numérico', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'multiplicacion', a: 'numero', b: 100 })
        .expect(502)
    });

  // DIVISIÓN
  it('/operaciones (GET)', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'division', a: 100, b: 2 })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((response) => {
          expect(response.body.resultado).toBe(50);
        });
    });

  it('/operaciones (GET) error por valor no numérico', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'division', a: 'numero', b: 100 })
        .expect(502)
    });

    it('/operaciones (GET) error por valor no numérico', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .query({ operacion: 'division', a: 100, b: 0 })
        .expect(502)
    });

  // POTENCIA
  it('/potencia (GET)', () => {
      return request(app.getHttpServer())
        .get('/operaciones/potencia')
        .query({ b: 3, e: 3 })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((response) => {
          expect(response.body.resultado).toBe(27);
        });
    });

    it('/potencia (GET) error por valor no numérico', () => {
      return request(app.getHttpServer())
        .get('/operaciones/potencia')
        .query({ b: 'numero', e: 100 })
        .expect(502)
    });

  // FACTORIAL
  it('/factorial (GET)', () => {
      return request(app.getHttpServer())
        .get('/operaciones/factorial')
        .query({ n: 4 })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((response) => {
          expect(response.body.resultado).toBe(24);
        });
    });

    it('/potencia (GET) error por valor negativo', () => {
      return request(app.getHttpServer())
        .get('/operaciones/potencia')
        .query({ n: -4 })
        .expect(502)
    });

    it('/potencia (GET) error por valor no valido', () => {
      return request(app.getHttpServer())
        .get('/operaciones/potencia')
        .query({ n: 4.1 })
        .expect(502)
    });

    it('/potencia (GET) error por valor no valido', () => {
      return request(app.getHttpServer())
        .get('/operaciones/potencia')
        .query({ n: 'numero' })
        .expect(502)
    });
});