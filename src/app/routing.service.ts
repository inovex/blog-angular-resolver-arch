import { Injectable } from '@angular/core';
import { filter, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

function findDetailsRoute(ars: ActivatedRoute): ActivatedRoute | undefined {
  if (ars.outlet === 'details') {
    return ars;
  }

  for (const child of ars.children) {
    const childResult = findDetailsRoute(child);

    if (childResult) {
      return childResult;
    }
  }

  return undefined;
}

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: Router) {
  }

  detailsData$: Observable<any | undefined> = this.router.events.pipe(
    filter(x => x instanceof NavigationEnd),
    switchMap(() => {
      const activatedRoute = this.router.routerState.root;
      const detailsDataObservable = findDetailsRoute(activatedRoute)?.data;
      return detailsDataObservable ?? of(undefined);
    }),
  );

  async reload() {
    const route = findDetailsRoute(this.router.routerState.root);

    if (!route?.routeConfig) {
      return;
    }

    const runGuardsAndResolvers = route.routeConfig.runGuardsAndResolvers;
    route.routeConfig.runGuardsAndResolvers = 'always';

    const commands = route.snapshot.url.map(segment => segment.path);
    await this.router.navigate(
      ['/', { outlets: { details: commands } }],
      { queryParamsHandling: 'preserve' });

    route.routeConfig.runGuardsAndResolvers = runGuardsAndResolvers;
  }
}
