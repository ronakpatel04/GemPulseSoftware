import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  employee: any = {}; // Object to store form data
  profilePreview!: string | ArrayBuffer | null ; // Property for profile picture preview
  aadhaarPreview!: string | ArrayBuffer | null ;

  constructor() {}

  onSubmit() {
    // Handle form submission logic here
    console.log(this.employee);
  }

  onFileSelected(event: any) {
    // Handle file upload logic for profile picture
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.profilePreview = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onAadhaarPicSelected(event: any) {
    // Handle file upload logic for Aadhaar card profile picture
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.aadhaarPreview = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }  }
}
