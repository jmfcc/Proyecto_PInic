export class Aprobados{
  Carne: number;
  Nombre: string;
  Creditos: number;
  NotaAprobada: number;
  constructor(carnet: number, nombre: string, creditos:number, notaAprobada:number){
      this.Carne=carnet
      this.Nombre=nombre
      this.NotaAprobada=notaAprobada
      this.Creditos=creditos
  }
}