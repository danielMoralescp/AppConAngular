import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Author } from './author.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthorService {

  private url: string = environment.url + 'authors';
  private urlFavorite: string = environment.url + 'author-favorites';

  constructor(private httpClient: HttpClient) { }

  getAuthor(id: string): Observable<Author> {
    let author: Author | null = null;

    return this.httpClient.get<Author>(this.url + '/' + id).pipe(
      map(dbAuthor => {
        author = new Author(dbAuthor.id);
        author.fullName = dbAuthor.fullName;
        author.image = dbAuthor.image;
        author.url = 'http://localhost:4200/profile/' + dbAuthor.id;
        return author;
      }),
      catchError(this.handleError)
    );
  }

  setAuthor(idAuthor: string, fullName: string, image: string): Observable<any> {
    let dbAuthor: any = { 'id': idAuthor, 'fullName': fullName, 'image': image };

    return this.httpClient.post(this.url, dbAuthor).pipe(
      catchError(this.handleError)
    );
  }

  updateAuthor(idAuthor: string, fullName: string, image: string): Observable<any> {
    let dbAuthor: any = { 'id': idAuthor, 'fullName': fullName, 'image': image };

    return this.httpClient.patch(this.url + '/' + idAuthor, dbAuthor).pipe(
      catchError(this.handleError)
    );
  }

  createFavorite(idAuthor: string): Observable<any> {
    let dbAuthorFav: any = { 'id': idAuthor, 'twimps': [] };

    return this.httpClient.post(this.urlFavorite, dbAuthorFav).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(() => errMsg);
  }
}
