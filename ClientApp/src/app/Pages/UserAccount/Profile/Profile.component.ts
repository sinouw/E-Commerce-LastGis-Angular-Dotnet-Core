import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails
  role
  constructor(private service: AccountService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        this.role=this.userDetails.role
      },
      err => {
        console.log(err);
      },
    );

  }
}
