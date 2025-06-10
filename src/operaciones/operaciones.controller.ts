import { Controller, Get, Query } from "@nestjs/common";
import { OperacionesService } from "./operaciones.service";

@Controller('operaciones')
export class OperacionesController {

    constructor(private readonly operService: OperacionesService) { }
    @Get()
    operar(
        @Query('operacion') operacion: string,
        @Query('a') a: number,
        @Query('b') b: number
    ): { resultado: number, mensaje: string } {
        const calculo = this.operService.operar(operacion, +a, +b);
        if (calculo) {
            return { resultado: calculo, mensaje: 'operacion exitosa' };
        }
        return { resultado: 0, mensaje: 'operacion no pudo ser calculada' };
    }
}