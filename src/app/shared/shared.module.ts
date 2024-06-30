//modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//servicios
import { TwimpService } from './twimp/twimp.service';
import { AuthorService } from './author/author.service';
//componentes
import { TwimpCardComponent } from './twimp/twimp-card/twimp-card.component';
import { TwimpListComponent } from './twimp/twimp-list/twimp-list.component';
import { AuthorCardComponent } from './author/author-card/author-card.component';

import { SortByPipe } from './sort-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [TwimpCardComponent, TwimpListComponent, AuthorCardComponent, SortByPipe],
  providers: [TwimpService, AuthorService],
  exports: [TwimpCardComponent, TwimpListComponent, AuthorCardComponent, RouterModule]
})
export class SharedModule { }
