import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './authGuardian/auth.guard'
import { HttpClient } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';


import {MatListModule} from '@angular/material/list'; 


import {MatInputModule} from '@angular/material/input'; 
import { MatTableModule} from '@angular/material/table'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import { ClientsComponent } from './clients/clients.component'; 
import {MatDialogModule} from '@angular/material/dialog'; 



import {MatButtonModule} from '@angular/material/button';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { HeimdallRolesComponent } from './heimdall-roles/heimdall-roles.component'; 
@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    routingComponents,
    LoginComponent,
    UsersComponent,
    RolesComponent,
    HeimdallRolesComponent,
  ],
  imports: [
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuard,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
