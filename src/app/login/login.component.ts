import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone:true,
  imports :[FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
   
  constructor(private router: Router){}
  onSubmit(): void {
    if (!this.username || !this.password) {
      alert('Please fill in all fields.');
      return;
    }
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.router.navigate(['/about']);

  }

}
