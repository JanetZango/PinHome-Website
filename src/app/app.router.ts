import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { AddingDataComponent } from './adding-data/adding-data.component';


export const router: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    { path: 'adding-data', component: AddingDataComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);