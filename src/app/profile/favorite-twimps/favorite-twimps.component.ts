import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable, from } from 'rxjs';

import { TwimpService } from '../../shared/twimp/twimp.service';
import { AuthorService } from '../../shared/author/author.service';
import { AuthenticationService } from '../../core/authentication.service';

import { Twimp } from '../../shared/twimp/twimp.model';

@Component({
  selector: 'tweempus-favorite-twimps',
  templateUrl: './favorite-twimps.component.html',
  styleUrls: ['./favorite-twimps.component.css']
})
export class FavoriteTwimpsComponent implements OnInit {

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
    this.twimpService.getTwimps().subscribe(twimps => {
      from(twimps).subscribe(twimp => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.getFavoritesByAuthor(this.idAuthor!, twimp.id).subscribe(favorite => {
            twimp.favorite = favorite;
            if (favorite) {
              this.twimpList.push(twimp);
            }
          })
        })
      })
    });
  }
}
