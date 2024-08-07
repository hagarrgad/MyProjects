import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './createorder/createorder.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TableComponent } from './WorkOrderTable/table.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
//  { path: '' , component : LoginComponent},
//   {path: 'searchbar', component:SearchBarComponent},
 { path: 'about', component: CreateFormComponent },
 { path: 'details', component: TableComponent },
 { path: 'login', component: LoginComponent },
 { path: '**', redirectTo:'login' },

  
 
];

