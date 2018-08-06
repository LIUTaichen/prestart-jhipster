import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IPlant } from '../../shared/model/plant.model';
import { PlantService } from '../../entities/plant/plant.service';

@Injectable({
    providedIn: 'root'
})
export class PlantResolverService implements Resolve<IPlant> {
    constructor(private plantService: PlantService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlant> {
        const id: number = Number(route.paramMap.get('plantId'));
        return this.plantService.find(id).pipe(
            map(response => {
                if (response) {
                    return response.body;
                } else {
                    // id not found
                    this.router.navigate(['/select-plant'], { skipLocationChange: true });
                    return null;
                }
            })
        );
    }
}
