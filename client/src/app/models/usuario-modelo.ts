export class Usuario{
    Carne: number;
    Nombres: string;
    Apellidos: string;
    Correo: string;
    constructor(carnet: number, nombres: string, apellidos:string, correo:string){
        this.Carne=carnet
        this.Nombres=nombres
        this.Correo=correo
        this.Apellidos=apellidos
    }
}
