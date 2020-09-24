import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ClientsComponent } from './components/clients/clients.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthInterceptor} from './interceptors/auth/auth.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatIconModule} from '@angular/material/icon';
import { ClientDialogComponent } from './components/dialogs/client-dialog/client-dialog.component';
import { UserDialogComponent } from './components/dialogs/user-dialog/user-dialog.component';
import { RolesDialogComponent } from './components/dialogs/roles-dialog/roles-dialog.component'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatMenuModule} from '@angular/material/menu'; 
import { HeimdallRolesComponent } from './components/heimdall-roles/heimdall-roles.component';
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
    RolesDialogComponent
  ],
  entryComponents: [ClientDialogComponent,UserDialogComponent,RolesDialogComponent],
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
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
