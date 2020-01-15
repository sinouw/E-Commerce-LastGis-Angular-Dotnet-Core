import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import {AccountService} from '../../Service/account.service';

@Component({
    selector: 'app-EditProfile',
    templateUrl: './EditProfile.component.html',
    styleUrls: ['./EditProfile.component.scss']
})
export class EditProfileComponent implements OnInit {
    payload: any;
    type: string;
    info: FormGroup;
    address: FormGroup;
    card: FormGroup;
    emailPattern: any = /\S+@\S+\.\S+/;
    toastOption: ToastOptions = {
        title: 'Account Information',
        msg: 'Your account information updated successfully!',
        showClose: true,
        timeout: 3000,
        theme: 'material'
    };

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formGroup: FormBuilder,
                private toastyService: ToastaService,
                private service: AccountService) {

        this.route.params.subscribe(params => {
            this.route.queryParams.forEach(queryParams => {
                this.type = queryParams['type'];
            });
        });
    }

    userDetails: any;
    roles;

    ngOnInit() {

        this.info = this.formGroup.group({
            UserName: ['', [Validators.required]],
            FullName: ['', [Validators.required]],
            Gender: ['', [Validators.required]],
            PhoneNumber: ['', [Validators.required]],
            Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
        });

        this.payload = this.service.getPayload();
        this.service.getUserProfile().subscribe(
            res => {
                this.userDetails = res;
                this.roles = this.userDetails.role;
                this.info = this.formGroup.group({
                    UserName: [this.userDetails.UserName, [Validators.required]],
                    FullName: [this.userDetails.FullName, [Validators.required]],
                    Gender: [this.userDetails.Gender, [Validators.required]],
                    PhoneNumber: [this.userDetails.PhoneNumber, [Validators.required]],
                    Email: [this.userDetails.Email, [Validators.required, Validators.pattern(this.emailPattern)]]
                });
            },
            err => {
                console.log(err);
            },
        );
    }

    /**
     * Function is used to submit the profile info.
     * If form value is valid, redirect to profile page.
     */
    submitProfileInfo() {
        if (this.info.valid) {
            this.service.Userbody = this.info.value;
            this.service.putUser();
            this.toastyService.success(this.toastOption);
            //  this.router.navigate(['/admin-panel/account/profile']).then(()=>{
            // this.toastyService.success(this.toastOption);
            //  });

        } else {
            for (let i in this.info.controls) {
                this.info.controls[i].markAsTouched();
            }
        }
    }

}
