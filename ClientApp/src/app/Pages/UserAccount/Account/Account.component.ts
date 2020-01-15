import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import {BaseUrl} from '../../../models/baseurl.data';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {
  User 
  constructor(private http: HttpClient,private service: AccountService) { }
 
   ngOnInit() {
   
     this.getUser()
      
   }
   getUser(){
     var paylaod = this.service.getPayload()
     this.http.get(BaseUrl+'/Admin/GetRole/'+paylaod.UserID).subscribe(
       res=>this.User=res,
       err=>console.log(err))
    }

}
