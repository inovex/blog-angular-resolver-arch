import { Component } from '@angular/core';
import { Movie, Page } from '../api/star-wars.model';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {

  constructor(private http: HttpClient) {
  }

  movies$ = this.http.get<Page<Movie>>('https://swapi.dev/api/films/')
    .pipe(map(page => page.results));

  getId(url: string) {
    return /https:\/\/swapi.dev\/api\/films\/(\d+)\//.exec(url)![1];
  }
}
