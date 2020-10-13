import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group-service/group-service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {Realm} from '../../../models/Realm';
import {RealmService} from '../../../services/realm-service/realm-service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
realm:Realm;
  constructor(private groupService: GroupService,
              private router: Router,
              private snackbar: SnackBarService,
              private realmService:RealmService) {
  }

  createGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {

  }

  onSubmit() {
    let realm = localStorage.getItem("realm")

    this.groupService.addNewGroup(this.createGroup.value,JSON.parse(realm).name).subscribe(data => {
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
    this.router.navigate(['/home/users-group']);
  }
}
