import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {ClientService} from '../../../services/clientService/client-service';
import {SubSink} from 'subsink';
import {User} from '../../../models/User';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {
  editUser;

  subSink = new SubSink();
  newClientForm = new FormGroup({
    clientName: new FormControl(),
  });

  constructor(
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.editUser = this.data
  }
}
