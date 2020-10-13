import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group-service/group-service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {Realm} from '../../../models/Realm';
import {RealmServiceService} from '../../../services/realm-service/realm-service.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
realm:Realm;
  constructor(private groupService: GroupServiceService,
              private router: Router,
              private snackbar: SnackBarServiceService,
              private realmService:RealmServiceService) {
  }

  createGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.realmService.currentRealm.subscribe((data:Realm) =>{
      this.realm = data
    })
  }

  onSubmit() {

    this.groupService.addNewGroup(this.createGroup.value,this.realm.name).subscribe(data => {
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
    this.router.navigate(['/home/users-group']);
  }
}
