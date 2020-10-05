import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/admin-login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ClientsComponent } from './components/admin/clients/clients.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './components/admin/users/users.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { ClientLoginComponent } from './components/auth/client-login/client-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ClientDialogComponent } from './components/admin/dialogs/client-dialog/client-dialog.component';
import { UserDialogComponent } from './components/admin/dialogs/user-dialog/user-dialog.component';
import { RolesDialogComponent } from './components/admin/dialogs/roles-dialog/roles-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { HeimdallRolesComponent } from './components/admin/heimdall-roles/heimdall-roles.component';
import { RealmSettingsComponent } from './components/admin/realm-settings/realm-settings.component';
import { RegistrationPageComponent } from './components/auth/registration-page/registration-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { RealmGeneralSettingComponent } from './components/admin/realm-settings/general/realm-general-setting.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RealmLoginSettingComponent } from './components/admin/realm-settings/login/realm-login-setting.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { UserProfileLoginComponent } from './components/auth/user-profile-login/user-profile-login.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { RealmNotFoundComponent } from './components/error-pages/realm-not-found/realm-not-found.component';
import { DeleteDialogComponent } from './components/admin/dialogs/delete-dialog/delete-dialog.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { AccountComponent } from './components/profile/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    routingComponents,
    LoginComponent,
    UsersComponent,
    RolesComponent,
    HeimdallRolesComponent,
    ClientLoginComponent,
    ClientDialogComponent,
    UserDialogComponent,
    RolesDialogComponent,
    RealmSettingsComponent,
    RegistrationPageComponent,
    RealmGeneralSettingComponent,
    RealmLoginSettingComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    UserProfileComponent,
    UserProfileLoginComponent,
    NotFoundComponent,
    RealmNotFoundComponent,
    DeleteDialogComponent,
    AccountComponent,
  ],
  entryComponents: [ClientDialogComponent, UserDialogComponent, RolesDialogComponent],
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatSlideToggleModule,
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '381043353625-kvdt5on5nhj6o991pui9ktnmi65vq409.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
