import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Publicacion } from '../models/publicacion';

@Injectable()

export class AuthService {

  authSubject = new BehaviorSubject(false);
  private token: string;


  constructor(private httpClient: HttpClient) { }

  register(user: UserI){
    return this.httpClient.post("http://localhost:3000/sys/registr", user);
  }


  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>("http://localhost:3000/sys/login",
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            this.saveToken(res.dataUser.accesTkn, res.dataUser.expiresIn);
          }
        }
      ));
  }

  logout(){
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }
  
  private saveToken(token: string, expiresIn: string):void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }
  
  getToken(): string{
    if (!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
  
  
  loggedIn(){
    return !!localStorage.getItem('ACCESS_TOKEN')
  }

 /****************** PUBLICACIONES ***********************/

  obtenerCursos(){
    return this.httpClient.get('http://localhost:3000/alex/obtener-cursos');
  }

  obtenerCatedraticos(){
    return this.httpClient.get('http://localhost:3000/alex/obtener-catedraticos');
  }

  obtenerCursoCatedratico(){
    return this.httpClient.get('http://localhost:3000/alex/obtener-curso-catedratico')
  }

  obtenerPublicaciones(){
    return this.httpClient.get('http://localhost:3000/alex/obtener-publicaciones');
  }

  obtenerUsuario(){
    return this.httpClient.post('http://localhost:3000/alex/get-usuario',{"token":this.getToken()});
  }

  crearPublicacion(publicacion:Publicacion){
    return this.httpClient.post("http://localhost:3000/alex/crear-publicacion", publicacion);
  }
 
  
}
