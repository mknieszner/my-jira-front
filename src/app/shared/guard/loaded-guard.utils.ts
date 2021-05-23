import {ActivatedRouteSnapshot} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {filter, mapTo, tap} from "rxjs/operators";

export abstract class LoadedGuardUtils {
  static assertExistanceOfPathParam(pathParamKey: string, route: ActivatedRouteSnapshot): string {
    const pathParam = route.paramMap.get(pathParamKey);
    if (pathParam) {
      throwError(`Missing ${pathParamKey} ${route.url}`)
    }
    return pathParam;
  }

  static passWhenLoaded(
    expectedLoadedSelector$: Observable<any>,
    loadFunction: () => void
  ): Observable<boolean> {
    return expectedLoadedSelector$.pipe(
      tap(isLoaded => {
        if (!isLoaded) {
          loadFunction();
        }
      }),
      filter(isLoaded => !!isLoaded),
      mapTo(true)
    );
  }
}
