import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {JwtResponseI} from '../../../models/jwt-response';
import { Router} from '@angular/router';
import { Publicacion } from 'src/app/models/publicacion';

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
  token: string;

  publicacion:Publicacion={
    mensaje: "",
    tipo: 0,
    codigo: "",
    token: ""
  }

  constructor(private authService:AuthService, private router:Router ) { 

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
        console.log(res );
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

  publicar(){
    this.token = this.authService.getToken();
    console.log(this.token);
    this.publicacion.mensaje=this.mensaje;
    this.publicacion.tipo=this.tipo;
    this.publicacion.codigo = this.selectedOption;
    this.publicacion.token = this.token;

    this.authService.crearPublicacion(this.publicacion).subscribe(
      res=>{
        console.log(res);
        this.router.navigateByUrl("/components/ver-publicacion");
        
      },
      err=>{
        console.log(err);
      }
    );

  }

}
