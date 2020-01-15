import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { EmbryoService } from 'src/app/Services/Embryo.service';
@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {
  userDetails
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: AccountService, private router: Router,public embryoService: EmbryoService) { }

  ngOnInit() {
    
    
      if (localStorage.getItem('token') != null)
        this.router.navigateByUrl('/home');
  }


  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var role = payLoad.role
        if(role == "SuperAdmin")
        this.router.navigateByUrl('/admin-panel/account/profile');
        if(role =="Admin")
        this.router.navigateByUrl('/admin-panel/account/profile');
        this.embryoService.connected=true;

      },
      err => {
        if (err.status == 400)
        {
          console.log('Incorrect username or password.', 'Authentication failed.');
        }
        else
          console.log(err);
      }
    );
  }
}
