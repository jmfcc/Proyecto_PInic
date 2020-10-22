import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onRegis(form):void{
    console.log(form.value)
    this.authService.register(form.value).subscribe(res=>{
      this.router.navigateByUrl('/components/login');
    });
    //this.router.navigateByUrl('/components');
  }
}
