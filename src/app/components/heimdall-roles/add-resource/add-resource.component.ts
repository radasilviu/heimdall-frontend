import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ResourcesService} from "../../../services/resources-service/resources.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent {

  formGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    private resourceService: ResourcesService,
    private router: Router
  ) {
  }

  addNewResource() {
    this.resourceService.addNewResource(this.formGroup.value).subscribe(() => {
      this.router.navigate(['home/roles/role-settings']);
    })
  }
}
