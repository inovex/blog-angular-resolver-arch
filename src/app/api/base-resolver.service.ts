import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, delay, EMPTY, finalize, from, isObservable, Observable } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export abstract class BaseResolver<T> implements Resolve<T> {
  private loadingBar: LoadingBarState;
  private snackbar: MatSnackBar;

  protected constructor(injector: Injector) {
    this.loadingBar = injector.get(LoadingBarService).useRef();
    this.snackbar = injector.get(MatSnackBar);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T {
    const result = this.resolveInternal(route);

    const observable = isObservable(result) ? result : from(Promise.resolve(result));

    this.loadingBar.start();
    return observable.pipe(
      delay(1_000),
      catchError(e => this.handleResolverError(e)),
      finalize(() => this.loadingBar.complete()),
    );
  }

  abstract resolveInternal(route: ActivatedRouteSnapshot): Observable<T> | Promise<T> | T

  handleResolverError(e: unknown) {
    console.error(e);
    this.snackbar.open('An error occurred while loading.', undefined, { duration: 2_000 });
    return EMPTY;
  }
}
