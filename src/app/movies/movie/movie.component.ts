import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Movie } from '../../api/star-wars.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {

  constructor(private route: ActivatedRoute) {
  }

  movie$ = this.route.data.pipe(map(data => data['movie'] as Movie));
}
