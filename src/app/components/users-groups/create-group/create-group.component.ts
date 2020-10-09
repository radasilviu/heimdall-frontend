import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupServiceService} from '../../../services/group-service/group-service.service';
import {Router} from '@angular/router';
import {SnackBarServiceService} from '../../../services/snack-bar/snack-bar-service.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  constructor(private groupService: GroupServiceService,
              private router: Router,
              private snackbar: SnackBarServiceService) {
  }

  createGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    let realm = localStorage.getItem("realm")
    this.groupService.addNewGroup(this.createGroup.value,realm).subscribe(data => {
      this.router.navigate(['/home/users-group']);
    }, error => {
      this.snackbar.openSnackBar(error.error.message, 3000);
    });
  }
}
