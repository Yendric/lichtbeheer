import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { InfoComponent } from './components/views/info/info.component';
import { LampComponent } from './components/views/lamp/lamp.component';
import { LampenComponent } from './components/views/lampen/lampen.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';
import { SetupComponent } from './components/views/setup/setup.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'lampen',
        component: LampenComponent
    },
    {
        path: 'lamp/:id',
        component: LampComponent
    },
    {
        path: 'info',
        component: InfoComponent
    },
    {
        path: 'setup',
        component: SetupComponent
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
