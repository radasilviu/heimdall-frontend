import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group-service/group-service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../services/snack-bar/snack-bar-service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

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
    this.groupService.addNewGroup(this.createGroup.value).subscribe(data => {
      this.router.navigate(['/home/users-group']);
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }
}
