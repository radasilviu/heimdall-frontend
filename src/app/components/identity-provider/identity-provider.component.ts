import { Component, OnInit } from '@angular/core';
import {IdentityProviderServiceService} from '../../services/identity-provider-service/identity-provider-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-identity-provider',
  templateUrl: './identity-provider.component.html',
  styleUrls: ['./identity-provider.component.css']
})
export class IdentityProviderComponent implements OnInit {

  constructor(private identityService:IdentityProviderServiceService) { }

  identityGroup = new FormGroup({
    googleIsActive: new FormControl(false, Validators.required),
  });

  ngOnInit(): void {
    this.identityService.getGoogleProvider().subscribe(data =>{
      console.log(data)
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
