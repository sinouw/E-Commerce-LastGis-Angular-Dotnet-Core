import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../Service/account.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BaseUrl} from '../../../models/baseurl.data';

@Component({
    selector: 'app-Account',
    templateUrl: './Account.component.html',
    styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {
    User;
    role;

    constructor(private http: HttpClient, private service: AccountService) {
    }

    ngOnInit() {
        this.role = this.service.getPayload().role;
        this.getUser();

    }

    getUser() {
        var paylaod = this.service.getPayload();
        this.http.get(BaseUrl + '/Admin/GetRole/' + paylaod.UserID).subscribe(
            res => this.User = res,
            err => console.log(err));
    }

}
