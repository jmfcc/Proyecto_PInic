import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from './../../services/auth.service';
import { cargarDato } from 'src/app/models/cargar-curso';

@Component({
  selector: 'app-cargar-curso',
  templateUrl: './cargar-curso.component.html',
  styleUrls: ['./cargar-curso.component.css']
})
export class CargarCursoComponent implements OnInit {
  cursos:any = [];
  catedraticos:any = [];
  cursoCatedratico:any = [];
  cursoNombre:number;
  selectedOption: string;
  nota: number;
  token: string;
  datos:[] 
  cursosNuevos:any=[];
  dato:cargarDato={
    cursoNombre:0,
    nota: 0,
    token: ""
  }
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {

  }
  
  cursosLista() {
    
    this.cursos = [];
    this.catedraticos=[];
    this.cursoCatedratico=[];
    this.authService.cargarCurso().subscribe(
      res=>{
        
        this.cursos=res;
        console.log(this.cursos)
        this.cursosNuevos = this.cursos;
      },
      err=>{
        console.log(err);
      }
    );
  }
  agregarCurso(form) :void{
    var d = (<HTMLInputElement>document.getElementById("nota")).value;
    console.log(d+"ddd")
    var parseada= parseInt(d);
    console.log(parseada)
    if(parseada>60){
      this.token = this.authService.getToken();
      this.dato.token = this.token;
      this.dato.cursoNombre=form.value.cursoNombre;
      this.dato.nota=form.value.nota;
      this.authService.cargarCursoDatos(this.dato,form.value).subscribe(function(res){
  
        
      })
      window.location.href="/components/mi-perfil"
    }else{
      alert("El curso aun no ha sido ganado")
    }
    console.log(form.value.cursoNombre)
    
  
  }
}
