import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  employee: any = {}; // Object to store form data
  profilePreview!: string | ArrayBuffer | null ; // Property for profile picture preview
  aadhaarPreview!: string | ArrayBuffer | null ;

  employeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      aadhaarNumber: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      address: ['', Validators.required],
      // aadhaarFront: ['', Validators.required],
      // aadhaarBack: ['', Validators.required],
      referenceName: ['', Validators.required],
      referenceMobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }


  // Helper function to check if a form control has an error
  hasError(controlName: string, errorName: string) {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }
  
  
  
  onSubmit() {

    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      console.log("Form data:", formData); // Debugging message
      // Further processing of form data
    }else {
      console.log("Form is invalid. Cannot submit."); // Debugging message
      // Handle invalid form
    }
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
