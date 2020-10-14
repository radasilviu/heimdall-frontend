import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group-service/group-service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';
import {Realm} from '../../../models/Realm';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  realm: Realm;
  private subscription: Subscription;

  constructor(private groupService: GroupService,
              private router: Router,
              private snackbar: SnackBarService) {
  }

  createGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    let realm = localStorage.getItem('realm');
    this.subscription = this.groupService.addNewGroup(this.createGroup.value, JSON.parse(realm).name).subscribe(data => {
      this.router.navigate(['/home/users-group']);
      this.subscription.unsubscribe();

    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }
}
