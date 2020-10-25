import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';

/************** Componente de publicaciones  ****************/
import {VerPublicacionComponent} from './publ/ver-publicacion/ver-publicacion.component';
import {NuevaPublicacionComponent} from './publ/nueva-publicacion/nueva-publicacion.component'


import { AuthGuard } from './auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
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
    path: 'ver-publicacion',
    component: VerPublicacionComponent
  },
  {
    path: 'nueva-publicacion',
    component: NuevaPublicacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
