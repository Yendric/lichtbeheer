import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/views/home/home.component';
import { LampComponent } from './components/views/lamp/lamp.component';
import { LampenComponent } from './components/views/lampen/lampen.component';
import { InfoComponent } from './components/views/info/info.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './components/partials/toolbar/toolbar.component';
import { LampTableComponent } from './components/partials/lamp-table/lamp-table.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SetupComponent } from './components/views/setup/setup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LampComponent,
        LampenComponent,
        InfoComponent,
        NotFoundComponent,
        ToolbarComponent,
        LampTableComponent,
        SetupComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatSnackBarModule,
        NgxMatColorPickerModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSliderModule
    ],
    providers: [
        { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
