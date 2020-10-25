import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.css']
})
export class VerPublicacionComponent implements OnInit {
  publicaciones:any = [];
  cursos:boolean = true;
  catedraticos:boolean = true;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.mostrarTodasPublicaciones();
  }

  mostrarTodasPublicaciones(){
    this.authService.obtenerPublicaciones().subscribe(
      res=>{
        console.log(res);
        this.publicaciones=res;
      },
      err=>{
        console.log(err);
      }
    );
  }

  cambiarCatedraticos(){
    this.catedraticos = !this.catedraticos;
  }

  cambiarCursos(){
    this.cursos = !this.cursos;
  }

}
