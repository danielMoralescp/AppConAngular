import { Component, Input } from '@angular/core';

import { Author } from '../author.model';

@Component({
  selector: 'tweempus-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent {
  @Input() author: Author | null = null;
}
