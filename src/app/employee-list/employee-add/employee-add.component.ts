import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  employee: any = {};
  profilePreview!: string | ArrayBuffer | null;
  aadhaarPreview!: string | ArrayBuffer | null;
  uploadProfile : any;
  aadharFront : any;
  aadharBack:any;

  employeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, private toastrservice: ToastrService) {
  }


  hasError(controlName: string, errorName: string) {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.initForm();
    const employeeData = this.config.data.employee;

    if (employeeData) {
      this.populateForm(employeeData);
    }
  }

  initForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      aadhaarNumber: ['', [Validators.pattern('[0-9]{12}')]],
      address: ['', Validators.required],
      referenceName: [''  ],
      referenceMobileNo: ['', [Validators.pattern('[0-9]{10}')]],
      // aadhaarFront: ['', Validators.required],
      // aadhaarBack: ['', Validators.required],
    });
  }
  populateForm(employee: any) {
    this.employeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      mobileNo: employee.mobileNo,
      aadhaarNumber: employee.documents.number,
      address: employee.address,
      referenceName: employee.referenceName,
      referenceMobileNo: employee.referenceMobileNo,
    });
  }


  onSubmit() {

    this.employeeForm.markAllAsTouched()
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      formData.profilePhoto = this.uploadProfile; 
      const document = {
        name:"aadharCard",
        number: formData.aadhaarNumber,
        frontPhoto: this.aadharFront, // Assuming you have a variable to store the Aadhaar card front photo URL
        backPhoto: this.aadharBack    // Assuming you have a variable to store the Aadhaar card back photo URL
    };
    formData.document = document;

      if (this.config.data.employee) {
        const id = this.config.data.employee._id;
        delete this.config.data.employee['mobileNo']
        this.employeeService.editEmployee(id, formData).subscribe(response => {
          if (response && response.status) {
            this.toastrservice.success('User updated successfully', 'Success');
            this.ref.close();
          }
        }, (error) => {
          this.toastrservice.error(error.message, 'Error');
          this.ref.close();
        });
      } else {

        this.employeeService.addEmployee(formData).subscribe(response => {

          if (response && response.status) {
            this.toastrservice.success(response.message, 'Success');
            this.ref.close();

          }

        }, (error) => {
          this.toastrservice.error(error.message, 'Error');
          this.ref.close();
        })

      }
    }
  }




  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.employeeService.uploadProfile(formData).subscribe(
            (response: any) => {
                console.log("Response =>", response);
                this.uploadProfile =  response.Location;
                this.toastrservice.success('Photo Upload SuccessFully !', 'Success');

            },
            (error: any) => {
                console.error("Error uploading file:", error);
                this.toastrservice.error('Please Try After Sometimes', 'Error');

            }
        );

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result) {
                this.profilePreview = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
  }



  onAadhaarPicSelectedFront(event: any) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.employeeService.uploadProfile(formData).subscribe(
            (response: any) => {
                console.log("Response =>", response);
                this.aadharFront =  response.Location;
                this.toastrservice.success('Photo Upload SuccessFully !', 'Success');

            },
            (error: any) => {
              this.toastrservice.error('Please Try After Sometimes', 'Error');

                console.error("Error uploading file:", error);
            }
        );

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result) {
            }
        };
        reader.readAsDataURL(file);
    }

  }

  onAadhaarPicSelectedBack(event:any)
  {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.employeeService.uploadProfile(formData).subscribe(
            (response: any) => {
                console.log("Response =>", response);
                this.aadharBack =  response.Location;
                this.toastrservice.success('Photo Upload SuccessFully !', 'Success');

            },
            (error: any) => {
                console.error("Error uploading file:", error);
                this.toastrservice.error('Please Try After Sometimes', 'Error');

            }
        );

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result) {
            }
        };
        reader.readAsDataURL(file);
    }

  }
}
