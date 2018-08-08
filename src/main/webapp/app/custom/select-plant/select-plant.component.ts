import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlantService } from '../../entities/plant';
import { LocationService } from '../../entities/location';
import { Observable } from 'rxjs';
import { IPlant } from '../../shared/model/plant.model';
import { IPlantLog, PlantLog } from '../../shared/model/plant-log.model';
import { PrestartDataService } from '../prestart-data/prestart-data.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime, throttleTime, merge } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ILocation, Location } from 'app/shared/model//location.model';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    selector: 'jhi-select-plant',
    templateUrl: './select-plant.component.html',
    styleUrls: ['./select-plant.component.css']
})
export class SelectPlantComponent implements OnInit, OnDestroy {
    obtainingLocation = true;
    fetchingPlants = false;
    plants: Array<IPlant>;
    watchID: number;
    constructor(
        private plantService: PlantService,
        private prestartDataService: PrestartDataService,
        private router: Router,
        private locationService: LocationService
    ) {}

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
            .pipe(throttleTime(30000), merge(positionUpdates.debounceTime(30000)), distinctUntilChanged())
            .flatMap(position => {
                console.log('emitting position', position);
                this.obtainingLocation = false;
                this.fetchingPlants = true;
                const location: Location = new Location();
                location.latitude = position.coords.latitude;
                location.longitude = position.coords.longitude;
                location.direction = position.coords.heading + ' ';
                location.speed = position.coords.speed;
                location.provider = 'Mobile Device';
                location.timestamp = moment(position.timestamp);
                console.log(location);
                this.prestartDataService.initialize();
                this.prestartDataService.setLocation(location);
                return this.plantService.query({
                    byLocation: true,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    maxDistance: 50
                });
            })
            .subscribe(plants => {
                this.fetchingPlants = false;
                this.plants = plants.body;
            });
    }

    onPlantClicked(plant: IPlant) {
        this.prestartDataService.setPlantId(plant.id);
        this.router.navigate(['/plant-confirmation'], { skipLocationChange: false });
    }

    ngOnDestroy() {
        console.log('stop watching for position updates');
        navigator.geolocation.clearWatch(this.watchID);
    }
}
