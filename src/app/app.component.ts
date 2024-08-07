import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModel } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TableComponent } from "./WorkOrderTable/table.component";
import { filter, Subscription } from 'rxjs';
import { CreateFormComponent } from './createorder/createorder.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, SearchBarComponent, CreateFormComponent, TableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent{

  private routerSubscription!: Subscription;
  title = 'WFM';
  currentPage: string = '';
  constructor(private router:Router){
    this.trackRouter();
  }
  handleSearch(query: string) {
    console.log('Search query:', query);
    // Implement your search logic here
  }
  ngOnInit(){
  }

  private trackRouter(){
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.urlAfterRedirects;
        // console.log('Navigation ended with URL:', event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
