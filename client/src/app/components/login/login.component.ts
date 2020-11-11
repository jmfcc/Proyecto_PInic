import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI} from '../../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.logout()
    //this.router.navigate(['/components/login']);
  }

  onLogin(form): void { 
    //console.log('Login', form.value);
    this.authService.login(form.value).subscribe(res =>{
      console.log('deberia redireccionar');
      //localStorage.setItem('usuario',)
      this.router.navigate(['/components/home']);
    });
   }
   
}
