import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlantService } from '../../entities/plant';
import { Observable } from 'rxjs';
import { IPlant } from '../../shared/model/plant.model';
import { PrestartDataService } from '../prestart-data/prestart-data.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'jhi-select-plant',
    templateUrl: './select-plant.component.html',
    styleUrls: ['./select-plant.component.css']
})
export class SelectPlantComponent implements OnInit, OnDestroy {
    plants: Array<IPlant>;
    watchID: number;
    constructor(private plantService: PlantService, private prestartDataService: PrestartDataService) {}

    ngOnInit() {
        console.log(this.prestartDataService.info);
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
        this.prestartDataService.plant = plant;
    }

    ngOnDestroy() {
        console.log('stop watching for position updates');
        navigator.geolocation.clearWatch(this.watchID);
    }
}
