import {Component, OnInit} from '@angular/core';
import {IdentityProviderService} from '../../services/identity-provider-service/identity-provider-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-identity-provider',
  templateUrl: './identity-provider.component.html',
  styleUrls: ['./identity-provider.component.css']
})
export class IdentityProviderComponent implements OnInit {
  private subscription: Subscription;

  constructor(private identityService: IdentityProviderService) {
  }

  identityGroup = new FormGroup({
    googleIsActive: new FormControl(false, Validators.required),
  });

  ngOnInit(): void {
    this.subscription = this.identityService.getGoogleProvider().subscribe(data => {
      this.identityGroup.patchValue({
        googleIsActive: data
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onSubmit() {
    let googleIsActive = this.identityGroup.value;
    this.identityService.setGoogleProvider(googleIsActive.googleIsActive);
  }
}
