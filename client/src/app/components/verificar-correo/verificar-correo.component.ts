import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  mensaje:boolean=false
  usuarioVerificado:boolean=false
  soloLectura:boolean= false
  usuario

  ngOnInit(): void {
  }

  verificar(form){
      console.log(form.value)
      this.authService.verificarCorreo(form.value).subscribe(res =>{
        
        console.log(form.value)
        this.usuario = form.value.usuario
        this.usuarioVerificado = true
        this.soloLectura=true

      }, err =>{
        console.log(err)
        this.mensaje=true
      });
  }

  cerrarMensaje(){
    this.mensaje=false
  }

  cambiarContrasenia(form1){
    form1.value.usuario = this.usuario
    console.log(form1.value)
    this.authService.actualizarContrasenia(form1.value).subscribe(res =>{
      console.log(res)
    }, err =>{
      console.log(err)
    });
  }
}
