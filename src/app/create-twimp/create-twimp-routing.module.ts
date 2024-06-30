import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/auth-guard';

import { CreateTwimpComponent } from './create-twimp.component';

const createTwimpRoutes: Routes = [
    { 
        path: 'create-twimp', 
        component: CreateTwimpComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(createTwimpRoutes)
    ]
})
export class CreateTwimpRoutingModule { }
