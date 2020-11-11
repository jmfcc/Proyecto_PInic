import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.css']
})
export class VerPublicacionComponent implements OnInit {
  publicaciones:any = [];
  
  //cursos:boolean = true;
  //catedraticos:boolean = true;
  cursos:any = [];
  catedraticos:any = [];
  selectedOption: string = "todos";
  entro_cursos = false;
  entro_catedraticos = false;
  entro_curso_catedraticos = false;
  cursoCatedratico:any = [];

  constructor(private authService:AuthService,private _router: Router) { }

  ngOnInit(): void {
    this.selectedOption = "todos";
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




  mostrarCursos(){
    this.entro_cursos = true;
    this.entro_catedraticos = false;
    this.entro_curso_catedraticos = false;
    this.cursos = [];
    this.catedraticos=[];
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
    this.entro_cursos = false;
    this.entro_curso_catedraticos = false;
    this.entro_catedraticos = true;
    this.cursos = [];
    this.catedraticos=[];
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
    this.entro_cursos = false;
    this.entro_curso_catedraticos = true;
    this.entro_catedraticos = false;
    this.cursos = [];
    this.catedraticos=[];
    this.cursoCatedratico=[];
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

  filtro(id){
    
    if(this.entro_cursos){

      if(id==-1){
        this.authService.obtenerPublicacionesTodosCursos().subscribe(
          res=>{
            console.log(res);
            this.publicaciones=res;
          },
          err=>{
            console.log(err);
          }
        );
      }
      else{
        console.log(id)
        this.authService.obtenerPublicacionesPorCurso(id).subscribe(
          res=>{
            console.log(res);
            this.publicaciones=res;
          },
          err=>{
            console.log(err);
          }
        );
      }
    }
    else if(this.entro_catedraticos){
      if(id==-1){
        this.authService.obtenerPublicacionesTodosCatedraticos().subscribe(
          res=>{
            console.log(res);
            this.publicaciones=res;
          },
          err=>{
            console.log(err);
          }
        );
      }
      else{
        this.authService.obtenerPublicacionesPorCatedratico(id).subscribe(
          res=>{
            console.log(res);
            this.publicaciones=res;
          },
          err=>{
            console.log(err);
          }
        );
      }

    }
    else if(this.entro_curso_catedraticos){
      if(id==-1){
        this.authService.obtenerPublicacionesTodosCursoCatedratico().subscribe(
          res=>{
            console.log(res);
            this.publicaciones=res;
          },
          err=>{
            console.log(err);
          }
        );
      }
      else{
        this.authService.obtenerPublicacionesPorCursoCatedratico(id).subscribe(
          res=>{
            console.log(res);
            this.publicaciones=res;
          },
          err=>{
            console.log(err);
          }
        );
      }
    }
    else{
      this.mostrarTodasPublicaciones();
    }
  }

}
