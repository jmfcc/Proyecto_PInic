import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './components/auth-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/components',
    pathMatch: 'full'
  },
  {
    path: 'components',
    loadChildren: () => import('./components/auth.module').then(m => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
