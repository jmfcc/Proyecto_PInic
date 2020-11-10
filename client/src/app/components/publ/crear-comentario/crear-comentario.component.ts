import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { comentario } from 'src/app/models/comentario';
import { idPub } from 'src/app/models/idpub';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.css']
})
export class CrearComentarioComponent implements OnInit {
  publicacion:any;
  mensaje: string;

  idpub:idPub={
    publicacion: 0
  }

  coment:comentario={
    publicacion:0,
    mensaje: "",
    token:""
  }



  constructor(private _route: ActivatedRoute, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.idpub.publicacion = this._route.snapshot.params['idpub'];
    this.obtenerPublicacion();
  }

  obtenerPublicacion(){
    this.authService.obtenerPublicacionId(this.idpub).subscribe(
      res=>{
        console.log(res);
        this.publicacion=res;
      },
      err=>{
        console.log(err);
      }
    );
  }

  crearComentario(){
    this.coment.publicacion = this.idpub.publicacion;
    this.coment.mensaje = this.mensaje;
    this.coment.token = this.authService.getToken();

    this.authService.crearComentario(this.coment).subscribe(
      res=>{
        console.log(res);
        this.router.navigateByUrl("/components/ver-comentarios/"+this.coment.publicacion);
        
      },
      err=>{
        console.log(err);
      }
    );
  }


}
