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

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
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
