import { Component, OnInit } from '@angular/core';
import { LampService } from '../../../services/lamp.service';

@Component({
    selector: 'app-lamp-table',
    templateUrl: './lamp-table.component.html',
    styleUrls: ['./lamp-table.component.css']
})
export class LampTableComponent implements OnInit {
    displayedColumns: string[] = ['name', 'state', 'changestate', 'beheer']
    constructor(public lampService: LampService) { }

    ngOnInit(): void {
    }

}
