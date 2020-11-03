import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Light } from 'src/app/interfaces/light';
import { LampService } from 'src/app/services/lamp.service';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {
    debounceTime
} from "rxjs/operators";

@Component({
    selector: 'app-lamp',
    templateUrl: './lamp.component.html',
    styleUrls: ['./lamp.component.css']
})
export class LampComponent implements OnInit {

    constructor(public lampService: LampService, private route: ActivatedRoute) { }

    colorCtr: AbstractControl = new FormControl(null);
    public color: ThemePalette = 'primary';
    id: number;

    getLight(): Light {
        const id = +this.route.snapshot.paramMap.get('id');
        return this.lampService.getLight(id);
    }

    onSliderChange(event: any): void {
        this.lampService.setBrightness(this.getLight(), event.value)
    }

    ngOnInit(): void {
        this.colorCtr.valueChanges
            .pipe(debounceTime(250))
            .subscribe(color => {
                this.lampService.setColor(this.getLight(), color.r ? color.r : 0, color.g ? color.g : 0, color.b ? color.b : 0);
                console.log(color);
            });
    }

}
