import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/authGuardian/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {ClientLoginComponent} from './components/client-login/client-login.component';

const routes: Routes = [
  {path : 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path : '', component: LoginComponent},
  {path: 'oauth/client-login', component: ClientLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ HomeComponent, LoginComponent, ClientLoginComponent];
