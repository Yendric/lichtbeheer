import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Light } from '../interfaces/light';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LampService {
    username: string = localStorage.getItem('hue_api_username');
    hueApiUrl: string;
    lights: Light[] = [];
    onLights: Light[] = [];

    constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) {
        this.init();
    }

    init(): void {
        this.http.get('https://discovery.meethue.com')
            .subscribe(data => {
                if (this.username) {
                    this.hueApiUrl = `http://${data[0]['internalipaddress']}/api/${this.username}/lights`;
                    this.getLights();
                    this.snackbar.open('Succesvol verbonden')
                } else {
                    this.hueApiUrl = `http://${data[0]['internalipaddress']}/api`;
                    this.http.post(this.hueApiUrl, { 'devicetype': 'lichtbeheer#app' }).subscribe(data => { });
                    this.router.navigate(['setup']);
                }
            });
    }

    async setup(): Promise<boolean> {
        await this.http.post(this.hueApiUrl, { 'devicetype': 'lichtbeheer#app' })
            .subscribe(data => {
                data = data[0];
                if (data['success']['username']) {
                    this.username = data['success']['username'];
                    localStorage.setItem('hue_api_username', this.username);
                    alert('Succesvol verbonden');
                    this.init();
                    this.router.navigate(['']);
                    return true;
                }
            });
        return false;
    }

    async getLights(): Promise<Light[]> {
        await this.http.get<Light[]>(this.hueApiUrl)
            .subscribe(data => {
                this.lights = Object.values(data);
                this.onLights = this.lights.filter(light => light.state.on === true);
            });
        return this.lights;
    }

    getLight(light: number): Light {
        return this.lights[light - 1];
    }

    getXY(red: number, green: number, blue: number) {

        if (red > 0.04045) {
            red = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4);
        }
        else red = (red / 12.92);

        if (green > 0.04045) {
            green = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
        }
        else green = (green / 12.92);

        if (blue > 0.04045) {
            blue = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
        }
        else blue = (blue / 12.92);

        var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
        var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
        var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;
        var x = X / (X + Y + Z);
        var y = Y / (X + Y + Z);

        return new Array(x, y);

    }

    getIdFromLight(light: Light): number {
        return this.lights.indexOf(light) + 1;
    }

    setColor(light: Light, red: number, green: number, blue: number): void {
        const xy = this.getXY(red, green, blue);
        this.http.put(`${this.hueApiUrl}/${this.getIdFromLight(light)}/state`,
            { on: true, xy }
        ).subscribe(() => { })
    }

    setBrightness(light: Light, bri: any) {
        this.http.put(`${this.hueApiUrl}/${this.getIdFromLight(light)}/state`,
            { on: true, bri }
        ).subscribe(() => { })
    }

    turnAllLights(on: boolean): void {
        this.lights.forEach(light => {
            this.http.put(
                `${this.hueApiUrl}/${this.lights.indexOf(light) + 1}/state`,
                { on }
            ).subscribe(() => this.getLights())
        });
    }

    toggleState(light: Light): void {
        this.http.put(
            `${this.hueApiUrl}/${this.lights.indexOf(light) + 1}/state`,
            { on: !light.state.on }
        ).subscribe(() => this.getLights());
    }
}

