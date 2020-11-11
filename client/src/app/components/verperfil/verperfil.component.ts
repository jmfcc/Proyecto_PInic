import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario-modelo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.component.html',
  styleUrls: ['./verperfil.component.css']
})
export class VerperfilComponent implements OnInit {
  MiUsuario: Usuario[];
  
  constructor(private _servicio: AuthService,
    private _routes:ActivatedRoute,
    private enrutador:Router) { }
  Meat: number = Number(this._routes.snapshot.params['VarC']);
  ngOnInit(): void {
    this._servicio.obtenerPerfil(this.Meat).subscribe(res => {
      this.MiUsuario = res
      console.log(this.MiUsuario)
    })
  }
}
