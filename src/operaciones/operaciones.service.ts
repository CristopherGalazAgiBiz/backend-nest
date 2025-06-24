import { Injectable } from '@nestjs/common';

@Injectable()
export class OperacionesService {
  operar(operacion: string = '', a: number, b: number) {
    if (operacion === 'suma') {
      return this.#suma(a, b);
    } else if (operacion === 'resta') {
      return this.#resta(a, b);
    } else if (operacion === 'multiplicacion') {
      return this.#multiplicacion(a, b);
    } else if (operacion === 'division') {
      return this.#division(a, b);
    }
  }

  #suma(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a + b;
  }

  #resta(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a - b;
  }

  #multiplicacion(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a * b;
  }

  #division(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    
    if(a === 0 || b === 0)
      return NaN;

    return a / b;
  }

  potencia(b: number, e: number) {
    if (b === undefined || e === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof b !== 'number' || typeof e !== 'number') {
      return NaN;
    }
    return b ** e;
  }

  factorial(n: number) {
    if (n === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof n !== 'number') {
      return NaN;
    }

    if (n === 0 || n === 1) {
      return 1;
    }

    let resultado = 1;
    for (let i = 2; i <= n; i++) {
      resultado *= i;
    }
    return resultado;
  }
}
