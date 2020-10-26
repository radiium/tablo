import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

interface IRouteConfigData {
    reuse: boolean;
}

interface ICachedRoute {
    handle: DetachedRouteHandle;
    data: IRouteConfigData;
}

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {

    private routeCache = new Map<string, ICachedRoute>();

    constructor() { }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return null;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        if (future.routeConfig !== curr.routeConfig) {
            return false;
        }

        // checking router params
        const futureParams = future.params;
        const currentParams = curr.params;
        const keysA = Object.keys(futureParams);
        const keysB = Object.keys(currentParams);

        if (keysA.length !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.
        for (const key of keysA) {
            if (currentParams[key] !== futureParams[key]) {
                return false;
            }
        }
        return true;
    }
}
