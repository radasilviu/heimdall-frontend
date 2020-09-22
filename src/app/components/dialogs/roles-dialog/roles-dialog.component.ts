import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent implements OnInit {
  newRoleName="";
  constructor() { }

  ngOnInit(): void {
  }

}
