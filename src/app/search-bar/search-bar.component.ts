import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchQuery: string = '';
  searchorder!: number;
  woID: number | undefined;

  constructor(private router: Router, private dataService: DataService) {}

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  // constructor(private dataService: DataService) {}
  onSearch() {
    this.search.emit(this.searchQuery);
  }

  createorder() {
    console.log('kkk');
    this.router.navigate(['/about']);
  }

  ShowDetails() {
    this.router.navigate(['/details']);
  }
  Onsearch(): void {
    if (this.woID) {
      this.dataService.searchorder(this.woID);
    } 
    else {
      this.dataService.getData()==null;
      // alert('You must enter work order id');
    }
  }
}
