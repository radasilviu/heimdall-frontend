import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupServiceService} from '../../../services/group-service/group-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  constructor(private groupService: GroupServiceService, private router: Router) {
  }

  createGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.groupService.addNewGroup(this.createGroup.value).subscribe(data => {
      this.router.navigate(['/home/users-group']);
    });
  }

}
