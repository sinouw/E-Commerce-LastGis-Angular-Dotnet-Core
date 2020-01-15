import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {BaseUrl} from '../../../../models/baseurl.data';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';

@Component({
  selector: 'app-add-new-categorie',
  templateUrl: './add-new-categorie.component.html',
  styleUrls: ['./add-new-categorie.component.css']
})
export class AddNewCategorieComponent implements OnInit {

  addNewCategorieForm    : FormGroup;
  
	constructor( private formBuilder : FormBuilder,
          private http : HttpClient,
          private accountservece: AccountService,
          public dialogRef    : MatDialogRef<AddNewCategorieComponent>
          ) { }

	ngOnInit() {
    let payload = this.accountservece.getPayload()
		this.addNewCategorieForm = this.formBuilder.group({
    Ncategorie      : ['', [Validators.required]],
    UserId          : payload.UserID,
    CreationDate    : new Date()
    })

	}



	// onFormSubmit method is submit a add new Categorie form.
	onFormSubmit(){
    this.http.post(BaseUrl+'/categories',this.addNewCategorieForm.value)
    .subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
		this.dialogRef.close(this.addNewCategorieForm.value);
	}

}
