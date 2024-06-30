import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CreateTwimpRoutingModule } from './create-twimp-routing.module';

import { CreateTwimpComponent } from './create-twimp.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CreateTwimpRoutingModule
  ],
  declarations: [CreateTwimpComponent],
  exports: [CreateTwimpComponent]
})
export class CreateTwimpModule { }

