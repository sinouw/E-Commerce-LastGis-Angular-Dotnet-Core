import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AccountService} from 'src/app/AdminPanel/Service/account.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BaseUrl} from '../../../../models/baseurl.data';

@Component({
    selector: 'app-edit-categorie',
    templateUrl: './edit-categorie.component.html',
    styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {

    EditCategorieForm: FormGroup;
    IdCat: string;
    Ncategorie: string;
    categorie;

    constructor(private formBuilder: FormBuilder,
                private http: HttpClient,
                private accountservece: AccountService,
                public dialogRef: MatDialogRef<EditCategorieComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        let payload = this.accountservece.getPayload();
        this.EditCategorieForm = this.formBuilder.group({
            Ncategorie: [this.data.Ncategorie, [Validators.required]],
            CreationDate: new Date(),
            UserId: payload.UserID,
            IdCat: this.data.IdCat
        });
    }

    ngOnInit() {
    }

    // onFormSubmit method is submit an Edit Categorie form.
    onFormSubmit() {
        this.http.put(BaseUrl + '/categories/' + this.data.IdCat, this.EditCategorieForm.value)
            .subscribe(res => {
                console.log(res);
            }, err => {
                console.log(err);
            });
        console.log(this.EditCategorieForm.value);
        this.dialogRef.close(this.EditCategorieForm.value);
    }
}
