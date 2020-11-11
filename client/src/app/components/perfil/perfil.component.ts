import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario-modelo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  MiUsuario: Usuario[];
  Meat: number=Number(localStorage.getItem('Usuario'));
  constructor(private _servicio: AuthService,
      private enrutador:Router) { }


  ngOnInit(): void {
    this._servicio.obtenerPerfil(this.Meat).subscribe(res=>{this.MiUsuario=res
    console.log(this.MiUsuario)
    })
  }

  Modificar(): void {
    var nombre:string=(<HTMLInputElement>document.getElementById("nombre")).value
    var apellido:string=(<HTMLInputElement>document.getElementById("apellido")).value
    var correo:string=(<HTMLInputElement>document.getElementById("correo")).value

    this._servicio.modificarPerfil(this.Meat, nombre,apellido,correo).subscribe(respu =>{
      console.log(respu)
      if(respu=='LISTO!'){
        window.location.reload()
      }
    })
  }

}
