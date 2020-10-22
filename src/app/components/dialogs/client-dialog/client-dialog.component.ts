import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {
  editUser:string;

  newClientForm = new FormGroup({
    clientName:new FormControl(),
    clientFrontendUrl: new FormControl('', Validators.required),
    authorizationServerFrontendURL: new FormControl('', Validators.required),
    clientBackendURL: new FormControl('', Validators.required)
  });


  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.editUser = localStorage.getItem("clientEdit")
  }

  onSubmit() {
    this.dialogRef.close(this.newClientForm.value)
  }
}
