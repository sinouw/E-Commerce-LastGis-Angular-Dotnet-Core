import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {BaseUrl} from '../../../../models/baseurl.data';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';


@Component({
  selector: 'app-add-new-sous-categorie',
  templateUrl: './add-new-sous-categorie.component.html',
  styleUrls: ['./add-new-sous-categorie.component.css']
})
export class AddNewSousCategorieComponent implements OnInit {
  categories              : any
  addNewSousCategorieForm : FormGroup;

	constructor( private formBuilder : FormBuilder,
    private http : HttpClient,
    private accountservece: AccountService,
    public dialogRef    : MatDialogRef<AddNewSousCategorieComponent>,
    private genericservice : AdminGenericService

    ) { }


  ngOnInit() {
    this.getCategories()

    let payload = this.accountservece.getPayload()
		this.addNewSousCategorieForm = this.formBuilder.group({
      NsousCategorie  : ['', [Validators.required]],
    CategorieId     : ['', [Validators.required]],
    UserId          : payload.UserID,
    CreationDate    : new Date()
    })
  }

  getCategories(){
    this.genericservice.get(BaseUrl+'/categories')
    .subscribe(res=>{
       console.log(res)
       this.categories=res;
    },err=>{
       console.log(err);
 
    })
 }

	// onFormSubmit method is submit a add new sous Categorie form.
	onFormSubmit(){
    this.http.post(BaseUrl+'/souscategories',this.addNewSousCategorieForm.value)
    .subscribe((res:any)=>{
      console.log(res);
      let body = {
        NsousCategorie      : res.NsousCategorie,
        UserId          : res.UserId,
        CreationDate    : res.CreationDate,
        IdScat           : res.IdScat,
      }

      this.dialogRef.close(body);

    },err=>{
      console.log(err);
    })
	}

}
