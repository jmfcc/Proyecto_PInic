import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {JwtResponseI} from '../../../models/jwt-response';

@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.component.html',
  styleUrls: ['./nueva-publicacion.component.css']
})
export class NuevaPublicacionComponent implements OnInit {
  cursos:any = [];
  catedraticos:any = [];
  cursoCatedratico:any = [];
  tipo:number = 0;
  selectedOption: string;
  mensaje: string;
  usuario: string;

  constructor(private authService:AuthService ) { 

  }

  ngOnInit(): void {
    
  }

  mostrarCursos(){
    this.cursos = [];
    this.catedraticos=[];
    this.cursoCatedratico=[];
    this.tipo = 1;
    this.authService.obtenerCursos().subscribe(
      res=>{
        console.log(res);
        this.cursos=res;
      },
      err=>{
        console.log(err);
      }
    );
  }

  mostrarCatedraticos(){
    this.cursos = [];
    this.catedraticos=[];
    this.cursoCatedratico=[];
    this.tipo = 2;
    this.authService.obtenerCatedraticos().subscribe(
      res=>{
        console.log(res);
        this.catedraticos=res;
      },
      err=>{
        console.log(err);
      }
    );
  }

  mostrarCursoCatedraticos(){
    this.cursos = [];
    this.catedraticos=[];
    this.cursoCatedratico=[];
    this.tipo = 3;
    this.authService.obtenerCursoCatedratico().subscribe(
      res=>{
        console.log(res);
        this.cursoCatedratico=res;
      },
      err=>{
        console.log(err);
      }
    );
  }

  obtenerToken(){
    this.usuario = this.authService.getToken().toString();
  }

  publicar(){
    this.obtenerToken();
    console.log(this.tipo);
    console.log(this.selectedOption);
    console.log(this.mensaje);
    console.log(this.usuario);
  }

}
