import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service'

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { InicioNavbarComponent } from './navbar/inicio-navbar/inicio-navbar.component';
import { HomeNavbarComponent } from './navbar/home-navbar/home-navbar.component';
import { NuevaPublicacionComponent } from './publ/nueva-publicacion/nueva-publicacion.component';
import { VerPublicacionComponent } from './publ/ver-publicacion/ver-publicacion.component';
import { VerComentariosComponent } from './publ/ver-comentarios/ver-comentarios.component';
import { CrearComentarioComponent } from './publ/crear-comentario/crear-comentario.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    InicioNavbarComponent,
    HomeNavbarComponent,
    NuevaPublicacionComponent,
    VerPublicacionComponent,
    VerComentariosComponent,
    CrearComentarioComponent,
    VerificarCorreoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  providers:[AuthService, AuthGuard]
})
export class AuthModule { }
