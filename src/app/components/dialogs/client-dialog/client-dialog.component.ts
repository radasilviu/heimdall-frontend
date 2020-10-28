import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {ClientService} from '../../../services/clientService/client-service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {
  editUser;

  newClientForm = new FormGroup({
    clientName: new FormControl(),
  });

  constructor(
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.clientService.editClient.pipe(tap(edit => this.editUser = edit)).subscribe();
  }
}
