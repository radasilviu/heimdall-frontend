import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ClientsComponent} from './components/clients/clients.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {UsersComponent} from './components/users/users.component';
import {RolesComponent} from './components/roles/roles.component';
import {ClientLoginComponent} from './components/client-login/client-login.component';
import {AuthInterceptor} from './interceptors/auth/auth.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {ClientDialogComponent} from './components/dialogs/client-dialog/client-dialog.component';
import {UserDialogComponent} from './components/dialogs/user-dialog/user-dialog.component';
import {RolesDialogComponent} from './components/dialogs/roles-dialog/roles-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {HeimdallRolesComponent} from './components/heimdall-roles/heimdall-roles.component';
import {RealmSettingsComponent} from './components/realm-settings/realm-settings.component';
import {RegistrationPageComponent} from './components/registration-page/registration-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {RealmGeneralSettingComponent} from './components/realm-settings/general/realm-general-setting.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {RealmLoginSettingComponent} from './components/realm-settings/login/realm-login-setting.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserProfileLoginComponent} from './components/user-profile-login/user-profile-login.component';
import {DeleteDialogComponent} from './components/dialogs/delete-dialog/delete-dialog.component';
import {AddRealmComponent} from './components/add-realm/add-realm.component';

import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {IdentityProviderComponent} from './components/identity-provider/identity-provider.component';
import {UsersGroupsComponent} from './components/users-groups/users-groups.component';
import {CreateGroupComponent} from './components/users-groups/create-group/create-group.component';
import {GroupUsersComponent} from './components/users-groups/group-users/group-users.component';
import {UserSessionComponent} from './components/user-session/user-session.component';
import {NotFoundComponent} from './components/error-pages/not-found/not-found.component';
import {RealmNotFoundComponent} from './components/error-pages/realm-not-found/realm-not-found.component';

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
    AddRealmComponent,
    ClientDialogComponent,
    UserProfileLoginComponent,
    UserProfileComponent,
    UserDialogComponent,
    RolesDialogComponent,
    RealmSettingsComponent,
    RegistrationPageComponent,
    RealmGeneralSettingComponent,
    RealmLoginSettingComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    DeleteDialogComponent,
    IdentityProviderComponent,
    UsersGroupsComponent,
    NotFoundComponent,
    RealmNotFoundComponent,
    CreateGroupComponent,
    GroupUsersComponent,
    UserSessionComponent,
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
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
export class AppModule {
}
