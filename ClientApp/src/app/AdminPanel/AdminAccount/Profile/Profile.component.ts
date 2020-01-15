import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../Service/account.service';

@Component({
    selector: 'app-profile',
    templateUrl: './Profile.component.html',
    styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userDetails;
    roles;

    constructor(private router: Router, private service: AccountService) {
    }

    ngOnInit() {
        this.service.getUserProfile().subscribe(
            res => {
                this.userDetails = res;
                this.roles = this.userDetails.role;
            },
            err => {
                console.log(err);
            },
        );

    }

}
