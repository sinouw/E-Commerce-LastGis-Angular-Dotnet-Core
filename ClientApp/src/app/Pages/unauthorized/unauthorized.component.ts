import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  connected =false

  constructor(private service : AccountService,
    public router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token')==null){
      this.connected = false
    }else{
      this.connected = true
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/session/signin']);
  }

}
