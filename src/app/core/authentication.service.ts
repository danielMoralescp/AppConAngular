import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthorService } from '../shared/author/author.service';

import { Token } from './token.model';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  private url: string = environment.url + 'authenticated';

  token: Token | null = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authorService: AuthorService
  ) { 
    const token = localStorage.getItem('token');
    if(token != null) {
      let tokenLS = JSON.parse(token);
      this.token = new Token(tokenLS['_key'], tokenLS['_idAuthor']);
    }
  }

  login(idAuthor: string): void {
    this.authorService.getAuthor(idAuthor).subscribe(author => {
      const tokenGenerated = this.generateToken();
      this.saveSession(tokenGenerated, author.id).subscribe((response: any) => {
        this.token = new Token(response['id'], response['author']);
        localStorage.setItem('token', JSON.stringify(this.token));
        this.router.navigate(['/dashboard']);
      });
    });
  }

  logout(): void {
    this.deleteSession().subscribe(response => {
      this.token = null;
      localStorage.removeItem("token");
      this.router.navigate(['/login']);
    });
  }

  generateToken(): string {
    const date: number = new Date().getTime();
    let text: string = "";
    const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += date;

    return text;
  }

  saveSession(tokenGenerated: string, idAuthor: string): Observable<Object> {
    const session: Object = { 'id': tokenGenerated, 'author': idAuthor };

    return this.httpClient.post(this.url, session).pipe(
      catchError(this.handleError)
    );
  }

  deleteSession(): Observable<Object> {
    return this.httpClient.delete(this.url + '/' + this.token!.key).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(() => errMsg);
  }
}
