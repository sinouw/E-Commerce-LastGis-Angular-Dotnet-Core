import { Routes } from '@angular/router';
import { ProfileComponent } from './Profile/Profile.component';
import { AccountComponent } from './Account/Account.component';
import { AccountSettingComponent } from './AccountSetting/AccountSetting.component';
import { CollaborationComponent } from './Collaboration/Collaboration.component';
import { EditProfileComponent } from './EditProfile/EditProfile.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminAccountRoutes: Routes = [
	{
		path      : '',
      component : AccountComponent,
      canActivate: [AuthGuard],
		children: [ 
         {
            path: 'profile',
            component: ProfileComponent,
            canActivate: [AuthGuard]
         },
         { 
            path: 'settings', 
            component: AccountSettingComponent,
            canActivate: [AuthGuard]

         },
         { 
            path: 'collaboration', 
            component: CollaborationComponent,
            canActivate: [AuthGuard]

         },
         {
            path: 'profile/edit',
            component: EditProfileComponent,
            canActivate: [AuthGuard]

         },
      ]
	}
];
