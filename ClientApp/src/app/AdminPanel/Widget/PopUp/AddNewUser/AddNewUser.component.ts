import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { log } from 'util';
import { User } from 'src/app/Models/User.model';
import { RegisterBody } from 'src/app/Models/RegisterUser.model';
import {BaseUrl} from '../../../../models/baseurl.data';
@Component({
  selector: 'ms-add-new-client',
  templateUrl: './AddNewUser.component.html',
  styleUrls: ['./AddNewUser.component.scss']
})
export class AddNewUserComponent implements OnInit {
	registerBody : RegisterBody
	addNewUserForm    : FormGroup;
	emailPattern 		: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

	constructor( private formBuilder : FormBuilder,private service : AccountService,
					private http: HttpClient,
					public dialogRef    : MatDialogRef<AddNewUserComponent>) { }

	ngOnInit() {
		this.addNewUserForm = this.formBuilder.group({
			UserName     : ['', [Validators.required]],
            FullName     : ['', [Validators.required]],
            Gender       : ['',[Validators.required]],
            PhoneNumber  : ['', [Validators.required]],
			Email        : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
			Password: ['', [Validators.required, Validators.minLength(4)]],
			ConfirmPassword: ['', [Validators.required]],
			accessType   : ['',[Validators.required]]
		},{ validator  : this.comparePasswords },)
	}

	registerForAdmin() {
	
		return this.http.post(BaseUrl + '/Admin/Register', this.registerBody)
		.subscribe(res=>{console.log(res);
		},err=>{console.log(err);
		});
	}
	comparePasswords(fb: FormGroup) {
		let confirmPswrdCtrl = fb.get('ConfirmPassword');
		//passwordMismatch
		//confirmPswrdCtrl.errors={passwordMismatch:true}
		if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
		  if (fb.get('Password').value != confirmPswrdCtrl.value)
			{confirmPswrdCtrl.setErrors({ passwordMismatch: true });
			console.log('dismatch')
			console.log(fb.get('accessType').value);
			;}
		  else
			{confirmPswrdCtrl.setErrors(null);
			console.log('No errors')
			console.log(fb.get('accessType').value)
		}
		}
	  }

	// onFormSubmit method is submit a add new user form.
	onFormSubmit(){
		this.registerBody = {
			UserName : this.addNewUserForm.value.UserName,
			FullName : this.addNewUserForm.value.FullName,
			Gender : this.addNewUserForm.value.Gender,
			PhoneNumber : this.addNewUserForm.value.PhoneNumber,
			Email : this.addNewUserForm.value.Email,
			Password : this.addNewUserForm.value.Password,
			Role : this.addNewUserForm.value.accessType,
		}
		console.log(this.registerBody.Role);
		
		this.registerForAdmin()


		this.dialogRef.close(this.registerBody);
	}
}
