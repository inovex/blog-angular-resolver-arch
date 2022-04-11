import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Character } from '../../api/star-wars.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent {

  constructor(private route: ActivatedRoute) {
  }

  character$ = this.route.data.pipe(map(data => data['character'] as Character));
}
