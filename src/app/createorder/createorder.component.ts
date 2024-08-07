import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [FormsModule, SearchBarComponent],
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss'],
})
export class CreateFormComponent {
  formData = {
    cname: '',
    cid: '',
    cmail: '',
    cnumber: '',
    pruposed_date: '',
    cadress: ''
  };
  isSubmitted = false;

  constructor(private dataservice: DataService, private router: Router) {}

  onSubmit() {

    let payload = Object.assign({}, this.formData); //.assign({}, this.formData) method in your code creates a shallow copy of the formData 
    //object. This is useful for creating a separate instance of the object to avoid unintended side effects from modifying the original formData.

    // Validate customer name
    if (!payload.cname || payload.cname.trim() === '') {
      alert('Customer name is required.');
      return; // Stop form submission
    }

    // Validate address
    if (!payload.cadress || payload.cadress.trim() === '') {//trim btshel el spaces 
      alert('Address is required.');
      return; // Stop form submission
    }

    // Validate phone number
    if (payload.cnumber && !this.isValidPhoneNumber(payload.cnumber)) {
      alert('Phone number must start with 0 and be exactly 11 digits.');
      return; // Stop form submission
    }

    // Validate email format
    if (payload.cmail !== '' && !this.isValidEmail(payload.cmail)) {
      alert('Invalid email format');
      return; // Stop form submission
    }

    // Validate that the proposed date is either today or in the future
    const inputDate = new Date(payload.pruposed_date);
    const today = new Date();
    const futureDateLimit = new Date(today);

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    futureDateLimit.setDate(today.getDate() + 14); // Validation 14 day

    if (!payload.pruposed_date) {
      alert('Please enter a date');
      return; // Stop form submission
    }

    if (inputDate < today) {
      alert('The date must be today or a future date.');
      return; // Stop form submission
    }

    if (inputDate > futureDateLimit) {
      alert('The date must be within 14 days from today.');
      return; // Stop form submission
    }

    // Format the date to include the time part for consistency
    payload.pruposed_date = `${payload.pruposed_date}T00:00:00`;

    console.log('Form Data:', this.formData);
    console.log('Payload:', payload);

    // Send the data to the service
    this.dataservice.createoeder(payload).subscribe(
      (response) => {
        console.log(response);
        this.isSubmitted = true;
        // Navigate to the details page after successful submission
        this.router.navigate(['/details']);
      },
      (error) => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again.');
      }
    );
  }

  // Custom validation function for phone number
  isValidPhoneNumber(number: string): boolean {
    const phoneNumberPattern = /^0\d{10}$/;
    return phoneNumberPattern.test(number);
  }

  // Custom validation function for email
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
