import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {BaseUrl} from '../../../../models/baseurl.data';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';

@Component({
  selector: 'app-edit-sous-categorie',
  templateUrl: './edit-sous-categorie.component.html',
  styleUrls: ['./edit-sous-categorie.component.css']
})
export class EditSousCategorieComponent implements OnInit {
  categories              : any
  addNewSousCategorieForm : FormGroup;

	constructor( private formBuilder : FormBuilder,
    private http : HttpClient,
    private accountservece: AccountService,
    public dialogRef    : MatDialogRef<EditSousCategorieComponent>,
    private genericservice : AdminGenericService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) { 
      this.getCategories()
  
      let payload = this.accountservece.getPayload()
      this.addNewSousCategorieForm = this.formBuilder.group({
      IdScat          : [this.data.IdScat, [Validators.required]],
      NsousCategorie  : [this.data.NsousCategorie, [Validators.required]],
      CategorieId     : [this.data.CategorieId, [Validators.required]],
      UserId          : payload.UserID,
      CreationDate    : new Date()
      })
    }


  ngOnInit() {
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
    this.http.put(BaseUrl+'/souscategories/'+this.data.IdScat,this.addNewSousCategorieForm.value)
    .subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
    console.log(this.addNewSousCategorieForm.value);
		this.dialogRef.close(this.addNewSousCategorieForm.value);
  }
  
 

}
