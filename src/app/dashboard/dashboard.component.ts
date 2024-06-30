import { Component, OnInit } from '@angular/core';

import { Observable, from } from 'rxjs';

import { TwimpService } from '../shared/twimp/twimp.service';
import { AuthorService } from '../shared/author/author.service';
import { AuthenticationService } from '../core/authentication.service';

import { Twimp } from '../shared/twimp/twimp.model';

@Component({
  selector: 'tweempus-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  twimpList: Twimp[] = [];

  constructor(
    private authService: AuthenticationService,
    private authorService: AuthorService,
    private twimpService: TwimpService) { }

  ngOnInit() {
    this.twimpService.getTwimps().subscribe(twimps => {
      from(twimps).subscribe(twimp => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.getFavoritesByAuthor(this.authService.token!.idAuthor, twimp.id).subscribe(favorite => {
            twimp.favorite = favorite;
            this.twimpList.push(twimp);
          });
        });
      });
    });
  }
}
