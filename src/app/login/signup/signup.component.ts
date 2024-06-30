import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../core/authentication.service';
import { AuthorService } from '../../shared/author/author.service';

@Component({
  selector: 'tweempus-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUserForm!: FormGroup;
  userAlreadyExist: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private authorService: AuthorService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      idAuthor: ['', [Validators.required, this.checkNick]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      image: ['']
    });
  }

  checkNick(fc: FormControl): { [invalidNick: string]: boolean } | null {
    const nick = fc.value,
      regexp = new RegExp('^[a-zA-Z0-9]*$');
    if (regexp.test(nick)) {
      return null;
    } else {
      return { 'invalidNick': true };
    }
  }

  signUp(form: any) {
    if (this.userAlreadyExist) {
      this.userAlreadyExist = false;
    }
    this.authorService.getAuthor(form.value.idAuthor).subscribe(
      author => this.userAlreadyExist = true,
      error => {
        this.authorService.setAuthor(form.value.idAuthor, form.value.fullName, form.value.image).subscribe(
          response => this.authorService.createFavorite(response['id']).subscribe(
            response => this.authService.login(response['id'])
          )
        )
      }
    )
  }
}
