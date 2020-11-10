import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ResourcesService} from "../../../services/resources-service/resources.service";
import {SubSink} from "subsink";

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent {
  @Output() message = new EventEmitter();
  subSink = new SubSink()
  isCreated = false
  formGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    private resourceService: ResourcesService) {
  }

  addNewResource() {
    this.subSink
      .add(this.resourceService
        .addNewResource(this.formGroup.value)
        .subscribe(() => {
          this.goBack()
        }))
  }

  goBack() {
    this.message.emit(this.isCreated)
  }

  ngOnDestroy() {
    this.subSink
      .unsubscribe()
  }
}
