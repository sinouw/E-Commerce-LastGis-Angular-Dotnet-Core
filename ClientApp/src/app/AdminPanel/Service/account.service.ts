import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/Models/User.model';
import { log } from 'util';
import {BaseUrl} from '../../models/baseurl.data';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  Userbody : User
  Users : any []=[]
  UserID:any
  UserFullName : any
  UserN : any
  userRole

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  login(formData) {
    return this.http.post(BaseUrl + '/Login', formData)
  }

  putUser(){
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.http.put(BaseUrl+'/Admin/Edit/'+payLoad.UserID,this.Userbody).subscribe(res=>{
      console.log(res)
   })
  }

  GetUsers(){
  this.http.get(BaseUrl+ '/Admin/GetAdmins').subscribe(
    res=>{
      this.Users=res as User[]
      this.Users = this.Users.filter(u=>u.Role=='Admin')
      console.log(res)      
    },
    err=>{
      console.log(err)
    })
    return this.Users
  }

  getToken(){
    return localStorage.getItem('token')
  }

  DeleteUser(username){
    this.http.delete(BaseUrl+'/Admin/Delete/'+username).subscribe(
      res=>{
        this.GetUsers()
      },err=>{
        console.log(err);
        
      })
  }

  getUserProfile() {
    var headers_object = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(BaseUrl + '/AdminUserProfile',{headers:headers_object});
  }
  getPayload(){
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    var userid = payLoad.UserID;
    
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
