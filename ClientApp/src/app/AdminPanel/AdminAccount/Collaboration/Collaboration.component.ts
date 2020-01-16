import {Component, OnInit} from '@angular/core';
import {AdminPanelServiceService} from '../../Service/AdminPanelService.service';
import {MatTableDataSource} from '@angular/material';
import {AccountService} from '../../Service/account.service';
import {HttpClient} from '@angular/common/http';
import { BaseUrl } from 'src/app/models/baseurl.data';
import { User } from 'src/app/Models/User.model';

@Component({
    selector: 'app-collaboration',
    templateUrl: './Collaboration.component.html',
    styleUrls: ['./Collaboration.component.scss']
})

export class CollaborationComponent implements OnInit {
    Users
    popUpDeleteUserResponse: any;
    popUpNewUserResponse: any;
    collaborationData: any [];

    // displayedColumns : string[] = ['image', 'name', 'email', 'access', 'action'];
    displayedColumns: string[] = ['FullName', 'Email', 'PhoneNumber', 'Role', 'action'];

    dataSource = new MatTableDataSource<any>(this.collaborationData);

    constructor(public service: AdminPanelServiceService, private accountService: AccountService, private http: HttpClient) {
    }

    ngOnInit() {
        this.getUsersInfo();
    }

    getUsersInfo() {
        this.GetUsers();
        this.service.getCollaborationContent().valueChanges().subscribe(res => this.getCollaborationData(res));
    }

    //getCollaborationData method is used to get the collaboration data.
    getCollaborationData(response) {

        // this.collaborationData = response;
        this.collaborationData = this.Users;
        setTimeout(() => {
            this.dataSource = new MatTableDataSource<any>(this.collaborationData);
        }, 1000);
        
    }

    /**
     *onDelete method is used to open a delete dialog.
     */
    onDelete(username, i) {
        this.service.deleteDialog('Are you sure you want to delete this user permanently?').subscribe(res => {
                this.popUpDeleteUserResponse = res;
            },
            err => console.log(err),
            () => {
                this.getDeleteResponse(username, this.popUpDeleteUserResponse, i);
            });
    }

    /**
     * getDeleteResponse method is used to delete a user from the user list.
     */
    getDeleteResponse(username: string, response: string, i) {
        if (response == 'yes') {
            this.dataSource.data.splice(i, 1);
            console.log(i);
            this.accountService.DeleteUser(username);
            // this.getUsersInfo()
            this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
    }

    /**
     * addNewUserDialog method is used to open a add new client dialog.
     */
    addNewUserDialog() {
        this.service.addNewUserDialog().subscribe(res => {
                this.popUpNewUserResponse = res;
                // this.getUsersInfo()
            },
            err => console.log(err),
            () => this.getAddUserPopupResponse(this.popUpNewUserResponse));

    }

    getAddUserPopupResponse(response: any) {
        if (response) {
            let addUser = {
                FullName: response.FullName,
                Email: response.Email,
                PhoneNumber: response.PhoneNumber,
                Role: response.Role,
                IsActive: response.IsActive
            };
            this.collaborationData.push(addUser);
            this.dataSource = new MatTableDataSource<any>(this.collaborationData);
        }
    }

    /*
    ChangeToSuper(username: string, i) {
        this.http.put(BaseUrl + '/Admin/Togglestatus/' + username)
            .subscribe(res => {
                    console.log(res);
                    setTimeout(() => {

                        this.getUsersInfo();
                    }, 5000);
                },
                err => {
                    console.log(err);
                });
    }


     */

    GetUsers(){
        this.http.get(BaseUrl+ '/Admin/GetAdmins?$select=FullName,IsActive,Gender,UserName,Email,PhoneNumber,Role').subscribe(
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

}
