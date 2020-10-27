import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { idPub } from 'src/app/models/idpub';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ver-comentarios',
  templateUrl: './ver-comentarios.component.html',
  styleUrls: ['./ver-comentarios.component.css']
})
export class VerComentariosComponent implements OnInit {

  publicacion:any;
  comentarios:any = [];

  idpub:idPub={
    publicacion: 0
  }

  constructor(private _route: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    this.idpub.publicacion = this._route.snapshot.params['idpub'];
    this.obtenerPublicacion();
    this.obtenerComentarios();
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

  obtenerComentarios(){
    this.authService.obtenerComentarios(this.idpub).subscribe(
      res=>{
        console.log(res);
        this.comentarios=res;
      },
      err=>{
        console.log(err);
      }
    );
  }


}
