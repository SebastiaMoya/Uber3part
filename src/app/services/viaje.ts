export class Viaje {
    id_viaje: number = 0;
    horasalida: string = '';
    asientos_disponibles: number = 0;
    fk_comuna: number = 0;
    fk_sede: number = 0;
    fk_patente: string = '';
    nombre_comuna?: string; // Propiedad opcional si necesitas mostrar el nombre de la comuna en el resultado
    nombre_sede?: string;
}
