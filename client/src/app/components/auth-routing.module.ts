import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';

/************** Componente de publicaciones  ****************/
import {VerPublicacionComponent} from './publ/ver-publicacion/ver-publicacion.component';
import {NuevaPublicacionComponent} from './publ/nueva-publicacion/nueva-publicacion.component'


import { AuthGuard } from './auth.guard'
import { VerComentariosComponent } from './publ/ver-comentarios/ver-comentarios.component';
import { CrearComentarioComponent } from './publ/crear-comentario/crear-comentario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerperfilComponent } from './verperfil/verperfil.component';


const routes: Routes = [
  {
    path: '',
    redirectTo:'/register',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verificar-email',
    component: VerificarCorreoComponent
  },
  {
    path: 'ver-publicacion',
    component: VerPublicacionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nueva-publicacion',
    component: NuevaPublicacionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ver-comentarios/:idpub',
    component:VerComentariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-comentario/:idpub',
    component:CrearComentarioComponent,
    component:CrearComentarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mi-perfil',
    component: PerfilComponent
  },
  {
    path: 'Ver-Perfil/:VarC',
    component:VerperfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
