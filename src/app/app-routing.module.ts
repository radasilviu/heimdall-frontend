import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { HomeGuard } from './guards/auth/home.guard';
import { ClientsComponent } from './components/clients/clients.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { HeimdallRolesComponent } from './components/heimdall-roles/heimdall-roles.component';
import { RealmSettingsComponent } from './components/realm-settings/realm-settings.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/roles', component: RolesComponent },
      { path: 'roles', component: HeimdallRolesComponent },
      { path: 'realm-settings', component: RealmSettingsComponent },
    ]
  },
  { path: '', component: LoginComponent, canActivate: [HomeGuard] },
  { path: 'oauth/client-login', component: ClientLoginComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, ClientLoginComponent];
