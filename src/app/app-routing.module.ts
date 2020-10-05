import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/admin/home/home.component';
import { LoginComponent } from './components/auth/admin-login/login.component';
import { ClientLoginComponent } from './components/auth/client-login/client-login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { HomeGuard } from './guards/auth/home.guard';
import { ClientsComponent } from './components/admin/clients/clients.component';
import { UsersComponent } from './components/admin/users/users.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { HeimdallRolesComponent } from './components/admin/heimdall-roles/heimdall-roles.component';
import { RealmSettingsComponent } from './components/admin/realm-settings/realm-settings.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { UserProfileLoginComponent } from './components/auth/user-profile-login/user-profile-login.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { RealmNotFoundComponent } from './components/error-pages/realm-not-found/realm-not-found.component';
import { RegistrationPageComponent } from './components/auth/registration-page/registration-page.component';
import {AccountComponent} from './components/profile/account/account.component';

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
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'user-profile/:realm/login', component: UserProfileLoginComponent },
  { path: 'user-profile/:realm', component: UserProfileComponent, canActivate: [AuthGuard], children: [
      { path: 'account', component: AccountComponent },
    ]
  },
  { path: 'realm/not-found', component: RealmNotFoundComponent },
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, ClientLoginComponent];
