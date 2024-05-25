import { Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'new-user', component: NewUserComponent},
    { path: 'home', component: HomeComponent}
];
