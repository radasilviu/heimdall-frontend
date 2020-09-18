import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {ClientLoginComponent} from './components/client-login/client-login.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {HomeGuard} from './guards/auth/home.guard';

const routes: Routes = [
  {path : 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path : '', component: LoginComponent, canActivate: [HomeGuard]},
  {path: 'oauth/client-login', component: ClientLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ HomeComponent, LoginComponent, ClientLoginComponent];
