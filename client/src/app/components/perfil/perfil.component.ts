import { Component, OnInit } from '@angular/core';
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
  constructor(private _servicio: AuthService) { }

  ngOnInit(): void {
    this._servicio.obtenerPerfil(this.Meat).subscribe(res=>{this.MiUsuario=res
    console.log(this.MiUsuario)
    })
  }

}
