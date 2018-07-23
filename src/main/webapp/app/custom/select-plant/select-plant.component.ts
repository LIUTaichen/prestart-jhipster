import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlantService } from '../../entities/plant';
import { Observable } from 'rxjs';
import { IPlant } from '../../shared/model/plant.model';
import { PrestartDataService } from '../prestart-data/prestart-data.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-select-plant',
    templateUrl: './select-plant.component.html',
    styleUrls: ['./select-plant.component.css']
})
export class SelectPlantComponent implements OnInit, OnDestroy {
    plants: Array<IPlant>;
    watchID: number;
    constructor(private plantService: PlantService, private prestartDataService: PrestartDataService, private router: Router) {}

    ngOnInit() {
        console.log('creating observable for position updates');
        const positionUpdates: Observable<Position> = Observable.create(observer => {
            this.watchID = navigator.geolocation.watchPosition(
                position => {
                    observer.next(position);
                },
                error => {
                    observer.error(error);
                },
                {
                    enableHighAccuracy: false
                }
            );
            console.log('obtained watchID', this.watchID);
        });
        positionUpdates
            .pipe(distinctUntilChanged())
            .flatMap(position => {
                console.log('emitting position', position);
                return this.plantService.query({
                    byLocation: true,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    maxDistance: 100
                });
            })
            .subscribe(plants => {
                console.log(plants.body);
                this.plants = plants.body;
            });
    }

    onPlantClicked(plant: IPlant) {
        const data = this.prestartDataService.data;
        data.plant = plant;
        this.prestartDataService.setData(data);
        this.router.navigate(['/plant-confirmation']);
    }

    ngOnDestroy() {
        console.log('stop watching for position updates');
        navigator.geolocation.clearWatch(this.watchID);
    }
}
