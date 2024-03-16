import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-party-add',
  templateUrl: './party-add.component.html',
  styleUrls: ['./party-add.component.scss']
})
export class PartyAddComponent implements OnInit {

  partyForm !: FormGroup

  hasError(controlName: string, errorName: string) {
    return this.partyForm.controls[controlName].hasError(errorName);
  }

  constructor(private formBuilder: FormBuilder, private partyService: PartyService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, private toastrservice: ToastrService) {
  }

  ngOnInit(): void {

    this.InitForm();
    const partyData = this.config.data.party;

    console.log("partyData => ", partyData)
    if (partyData) {
      this.populateForm(partyData);
    }
  }


  InitForm() {
    this.partyForm = this.formBuilder.group({

      name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required],
      email: ['', Validators.email],
      gstNo: ['', Validators.required]

    })
  }



  populateForm(party: any) {
    this.partyForm.patchValue({
      name: party.name,
      email: party.email,
      mobileNo: party.mobileNo,
      gstNo: party.gstNo,
      address: party.address,
    });
  }




  onSubmit() {

    this.partyForm.markAllAsTouched();


    if (this.partyForm.valid) {
      const formData = this.partyForm.value;
      if (this.config.data.party) {
        const id = this.config.data.party.id;
        this.partyService.editParty(id, formData).subscribe(response => {
          if (response && response.status) {
            this.toastrservice.success('User updated successfully', 'Success');
            this.ref.close();
          }
        }, (error) => {
          this.toastrservice.error(error.message, 'Error');
          this.ref.close();
        });
      } else {

        this.partyService.addParty(formData).subscribe(response => {

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

}
