import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventsComponent } from './pages/events/events.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'event',
        component:EventsComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent
    }
];
