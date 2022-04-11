import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Movie } from '../../api/star-wars.model';
import { HttpClient } from '@angular/common/http';
import { BaseResolver } from '../../api/base-resolver.service';

@Injectable({ providedIn: 'root' })
export class MovieResolver extends BaseResolver<Movie> {

  constructor(private http: HttpClient, injector: Injector) {
    super(injector);
  }

  resolveInternal(route: ActivatedRouteSnapshot) {
    return this.http.get<Movie>('https://swapi.dev/api/films/' + route.paramMap.get('id'));
  }
}
