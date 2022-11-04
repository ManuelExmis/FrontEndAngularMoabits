export class Cliente {

    constructor(
        public nombre: string,
        public apellido: string,
        public telefono: string,
        public direccion: string,
        public codigoCliente?: string
    ){}

}