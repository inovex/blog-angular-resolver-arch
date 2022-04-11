import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Character } from '../../api/star-wars.model';
import { HttpClient } from '@angular/common/http';
import { BaseResolver } from '../../api/base-resolver.service';

@Injectable({ providedIn: 'root' })
export class CharacterResolver extends BaseResolver<Character> {

  constructor(private http: HttpClient, injector: Injector) {
    super(injector);
  }

  resolveInternal(route: ActivatedRouteSnapshot) {
    return this.http.get<Character>('https://swapi.dev/api/people/' + route.paramMap.get('id'));
  }
}
