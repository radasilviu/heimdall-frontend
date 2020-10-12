import { Component, OnInit } from '@angular/core';
import {IdentityProviderService} from '../../services/identity-provider-service/identity-provider-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-identity-provider',
  templateUrl: './identity-provider.component.html',
  styleUrls: ['./identity-provider.component.css']
})
export class IdentityProviderComponent implements OnInit {

  constructor(private identityService:IdentityProviderService) { }

  identityGroup = new FormGroup({
    googleIsActive: new FormControl(false, Validators.required),
  });

  ngOnInit(): void {
    this.identityService.getGoogleProvider().subscribe(data =>{
      this.identityGroup.patchValue({
        googleIsActive:data
      })
    })
  }

  onSubmit(){
    let googleIsActive = this.identityGroup.value;
    this.identityService.setGoogleProvider(googleIsActive.googleIsActive)
  }

}
