import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable, from } from 'rxjs';

import { TwimpService } from '../../shared/twimp/twimp.service';
import { AuthorService } from '../../shared/author/author.service';
import { AuthenticationService } from '../../core/authentication.service';

import { Twimp } from '../../shared/twimp/twimp.model';

@Component({
  selector: 'tweempus-my-twimps',
  templateUrl: './my-twimps.component.html',
  styleUrls: ['./my-twimps.component.css']
})
export class MyTwimpsComponent implements OnInit {

  twimpList: Twimp[] = [];
  idAuthor: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private authorService: AuthorService,
    private twimpService: TwimpService) { }

  ngOnInit() {
    this.idAuthor = this.route.parent!.snapshot.params['id'];
    this.twimpService.getAuthorTwimps(this.idAuthor!).subscribe(twimps => {
      from(twimps).subscribe(twimp => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.getFavoritesByAuthor(author.id, twimp.id).subscribe(favorite => {
            twimp.favorite = favorite;
            this.twimpList.push(twimp);
          })
        })
      })
    });
  }
}
