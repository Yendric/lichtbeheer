import { Component, OnInit } from '@angular/core';
import { LampService } from 'src/app/services/lamp.service';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

    constructor(public lampService: LampService) { }

    ngOnInit(): void {
    }

}
