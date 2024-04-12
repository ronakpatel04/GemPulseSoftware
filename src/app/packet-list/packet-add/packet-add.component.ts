import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PacketService } from 'src/app/services/packet.service';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-packet-add',
  templateUrl: './packet-add.component.html',
  styleUrls: ['./packet-add.component.scss']
})
export class PacketAddComponent {

  diamondForm!: FormGroup;
  paltyOptions: any[] = [];
  packetData: any

  dropdowns = [
    { label: 'Shape', controlName: 'shape', options: ['Round', 'Princess', 'Emerald', 'Oval', 'Marquise', 'Pear', 'Heart', 'Radiant'] },
    { label: 'Color', controlName: 'color', options: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] },
    { label: 'Purity', controlName: 'expected_purity', options: ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3', 'I1', 'I2', 'I3', 'I4', 'I5'] },
    { label: 'Diamond Type', controlName: 'diamond_type', options: ['CVD', 'REAL', 'HPHT'] },
    { label: 'Cut Type', controlName: 'expected_cut_type', options: ['Good Cut', 'Very Good Cut', 'Excellent Cut'] },
    { label: 'Polish Type', controlName: 'expected_polish_type', options: ['Good Polish', 'Very Good Polish', 'Excellent Polish'] },
    { label: 'Smy Type', controlName: 'expected_smy_type', options: ['Good Smy', 'Very Good Smy', 'Excellent Smy'] },
    // { label: 'Polish Status', controlName: 'polish_status', options: ['Not Started', 'Started', 'Issue', 'Ended', 'Submitted'] },
    { label: 'LAB', controlName: 'lab', options: ['GIA', 'IGA', 'HRD'] }

  ];

  textFields = [
    { label: 'kapanNumber', controlName: 'kapanNumber', type: 'text' },
    { label: 'Carat', controlName: 'carat', type: 'number' },
    { label: 'Raw Weight', controlName: 'rawWeight', type: 'number' },
    { label: 'Expected Weight', controlName: 'expectedWeight', type: 'number' },
    { label: 'Final Weight', controlName: 'finalWeight', type: 'number' },
    { label: 'Markable Weight', controlName: 'markableWeight', type: 'number' }
  ];

  constructor(private formBuilder: FormBuilder, private paltyService: PartyService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, private toastrservice: ToastrService, private packetService: PacketService) { }

  ngOnInit(): void {
    this.getPaltyOptions();
    this.initForm();
    this.packetData = this.config.data.packet;

    if (this.packetData) {
      this.populateForm(this.packetData);
    }
  }

  initForm(): void {
    this.diamondForm = this.formBuilder.group({
      shape: ['', Validators.required],
      color: ['', Validators.required],
      expected_purity: ['', Validators.required],
      diamond_type: ['', Validators.required],
      expected_cut_type: ['', Validators.required],
      expected_polish_type: ['', Validators.required],
      expected_smy_type: ['', Validators.required],
      lab: ['', Validators.required],
      polish_status: ['Not Started'],
      kapanNumber: ['', Validators.required],
      carat: ['', Validators.required],
      rawWeight: ['', Validators.required],
      expectedWeight: ['', Validators.required],
      finalWeight: [''],
      markableWeight: [''],
      paltyId: ['']
    });
  }


  populateForm(packet: any) {
    this.diamondForm.patchValue({

      shape: packet.shape,
      color: packet.color,
      expected_purity: packet.purity,
      diamond_type: packet.diamond_type,
      expected_cut_type: packet.expected_cut_type,
      expected_polish_type: packet.expected_polish_type,
      expected_smy_type: packet.expected_smy_type,
      polish_status: packet.polish_status,
      kapanNumber: packet.kapanNumber,
      carat: packet.carat,
      lab: packet.lab,
      rawWeight: packet?.weight?.rawWeight,
      expectedWeight: packet?.weight?.expectedWeight,
      finalWeight: packet?.weight?.finalWeight,
      markableWeight: packet?.weight?.markableWeight,
      paltyId: packet?.palty

    })
  }



  getPaltyOptions(): void {
    this.paltyService.getParty().subscribe(options => {
      this.paltyOptions = options.data;
    });
  }

  onSubmit(): void {

    this.diamondForm.markAllAsTouched();
    if (this.diamondForm.valid) {

      const formValue = this.diamondForm.value;

      if (this.packetData) {
        const formData = {
          kapanNumber: formValue.kapanNumber,
          shape: formValue.shape,
          color: formValue.color,
          expected_purity: formValue.purity,
          diamond_type: formValue.diamond_type,
          expected_cut_type: formValue.expected_cut_type,
          expected_polish_type: formValue.expected_polish_type,
          expected_smy_type: formValue.expected_smy_type,
          carat: formValue.carat,
          lab: formValue.lab,
          polish_status: 'Not Started',
          weight: {
            rawWeight: formValue?.rawWeight,
            expectedWeight: formValue?.expectedWeight,
            finalWeight: formValue?.finalWeight,
            markableWeight: formValue?.markableWeight,
            _id: this.packetData.weight._id
          },
          employee: formValue.employee,
          paltyId: formValue?.paltyId,
          priceId: formValue.price
        };


        this.packetService.editPacket(this.packetData._id, formData).subscribe(response => {
          if (response && response.status) {
            this.toastrservice.success('Diamond updated successfully', 'Success');
            this.ref.close();
          }
        }, (error) => {
          this.toastrservice.error(error.message, 'Error');
          this.ref.close();
        });

      }
      else {
        const formData = {
          kapanNumber: formValue.kapanNumber,
          shape: formValue.shape,
          color: formValue.color,
          expected_purity: formValue.purity,
          diamond_type: formValue.diamond_type,
          expected_cut_type: formValue.expected_cut_type,
          expected_polish_type: formValue.expected_polish_type,
          expected_smy_type: formValue.expected_smy_type,
          carat: formValue.carat,
          lab: formValue.lab,
          polish_status: 'Not Started',
          weight: {
            rawWeight: formValue.rawWeight,
            expectedWeight: formValue.expectedWeight,
            finalWeight: formValue?.finalWeight,
            markableWeight: formValue?.markableWeight,

          },
          employeeId: "65f9ae740c890a41aea838bc",
          paltyId: formValue.paltyId,
          priceId: "65f9cad543136d6fb2cc6e1e" //FOR REFERENCE  NOW 
        };
        this.packetService.addPacket(formData).subscribe(response => {

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
