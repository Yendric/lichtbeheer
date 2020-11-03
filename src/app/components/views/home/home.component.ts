import { Component, OnInit } from '@angular/core';
import { LampService } from 'src/app/services/lamp.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(public lampService: LampService) { }


    ngOnInit(): void {
    }

}
