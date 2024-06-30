import { Component } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'tweempus-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  idAuthor: string | null = null;

  constructor(private authService: AuthenticationService) { }

  checkLogin() {
    if (this.authService.token != null) {
      this.idAuthor = this.authService.token.idAuthor;
      return true;
    }
    this.idAuthor = null;
    return false;
  }
}
