import { Injectable } from '@angular/core';
import { filter, map, Observable, startWith } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: Router) {
  }

  /**
   * Observable that emits the data of the route of the 'details' outlet
   * or undefined if none is active.
   */
  detailsData$: Observable<any | undefined> = this.router.events.pipe(
    filter(x => x instanceof NavigationEnd),
    startWith(undefined),
    map(() => this.detailsData),
  );

  /**
   * Returns the data of the route of the 'details' outlet or undefined if none is active.
   */
  get detailsData(): any | undefined {
    const detailsRoute = this.findDetailsRoute();
    return detailsRoute?.snapshot.data;
  }

  /**
   * Triggers a reload of the currently active route of the 'details' outlet.
   *
   * IMPORTANT: The routing module must have onSameUrlNavigation: 'reload' set.
   */
  async reloadDetails() {
    const route = this.findDetailsRoute();

    if (!route?.routeConfig) {
      return;
    }

    // For a reload to happen, we will set the 'runGuardsAndResolvers' of the details route's config
    // to 'always'. We remember the current value so we can revert it afterwards.

    const runGuardsAndResolvers = route.routeConfig.runGuardsAndResolvers;
    route.routeConfig.runGuardsAndResolvers = 'always';

    const commands = route.snapshot.url.map(segment => segment.path);
    await this.router.navigate(
      ['/', { outlets: { details: commands } }],
      { queryParamsHandling: 'preserve' });

    route.routeConfig.runGuardsAndResolvers = runGuardsAndResolvers;
  }

  /**
   * Recursively finds the child route of the 'details' outlet. Returns undefined if none is found.
   */
  findDetailsRoute(ars: ActivatedRoute = this.router.routerState.root): ActivatedRoute | undefined {
    if (ars.outlet === 'details') {
      return ars;
    }

    for (const child of ars.children) {
      const childResult = this.findDetailsRoute(child);

      if (childResult) {
        return childResult;
      }
    }

    return undefined;
  }
}
