import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character, Page } from '../api/star-wars.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent {

  constructor(private http: HttpClient) {
  }

  characters$ = this.http.get<Page<Character>>('https://swapi.dev/api/people/')
    .pipe(map(page => page.results));

  getId(url: string) {
    return /https:\/\/swapi.dev\/api\/people\/(\d+)\//.exec(url)![1];
  }
}
