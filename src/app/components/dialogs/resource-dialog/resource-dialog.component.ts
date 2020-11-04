import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-resource-dialog',
  templateUrl: './resource-dialog.component.html',
  styleUrls: ['./resource-dialog.component.css']
})
export class ResourceDialogComponent implements OnInit {
  resourceForm = new FormGroup({
    name: new FormControl(),
  });

  constructor() {
  }

  ngOnInit(): void {
  }
}
