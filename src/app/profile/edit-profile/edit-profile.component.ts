import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, FormControl, Validators } from '@angular/forms';


import { AuthenticationService } from '../../core/authentication.service';
import { AuthorService } from '../../shared/author/author.service';

import { Author } from '../../shared/author/author.model';

@Component({
  selector: 'tweempus-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editUserForm!: FormGroup;
  currentAuthor: Author | null = null;

  constructor(
    private authService: AuthenticationService,
    private authorService: AuthorService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.editUserForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      image: ['']
    });
  }

  editProfile(form: any) {
    this.authorService.updateAuthor(this.authService.token!.idAuthor, form.value.fullName, form.value.image).subscribe(
      response => console.log('Usuario modificado')
    )
  }
}
