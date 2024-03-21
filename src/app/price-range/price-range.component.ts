import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartyService } from '../services/party.service';
import { PriceService } from '../services/price.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent implements OnInit {
  form !: FormGroup;
  dropdownOptions: any[] = [];
  prices: any[] = [];
  isEdit: boolean = false;
  id!: string

  constructor(private fb: FormBuilder, private paltyService: PartyService, private priceService: PriceService, private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.getAllParty();
    this.initForm();
    this.getallPrice();
  }


  getAllParty() {
    this.paltyService.getParty().subscribe(response => {
      if (response && response.status) {
        this.dropdownOptions = response.data;
      }
    })
  }

  getallPrice() {
    this.priceService.getPrices().subscribe((response: any) => {
      if (response) {

        this.prices = response.data
      }
    })
  }


  initForm() {
    this.form = this.fb.group({
      paltyId: ['', Validators.required],
      carat1: ['', Validators.required],
      carat2: ['', Validators.required],
      workerPrice: ['', Validators.required],
      partyPrice: ['', Validators.required]
    });
  }

  editPrice(price: any) {

    this.isEdit = true;
    this.id = price._id
    this.form.patchValue({
      paltyId: price.paltyId._id,
      carat1: price.caratRange[0],
      carat2: price.caratRange[1],
      workerPrice: price.workerPrice,
      partyPrice: price.partyPrice
    });

  }

  isInvalidCaratRange(): boolean {
    const carat1 = this.form.get('carat1')?.value;
    const carat2 = this.form.get('carat2')?.value;
    return carat1 !== '' && carat2 !== '' && parseInt(carat1) > parseInt(carat2);
  }



  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const payload = {
        caratRange: [formData.carat1, formData.carat2],
        partyPrice: formData.partyPrice,
        workerPrice: formData.workerPrice,
        paltyId: formData.paltyId
      };


      if (this.isEdit) {

        this.priceService.editPrices(this.id, payload).subscribe((response: any) => {
          if (response) {
            this.toastrService.success('Price Updated Successfully !', 'Success');
            this.form.reset();
            this.getallPrice()
          }
        }, (error) => {
          this.toastrService.error(error.error.message, 'Error')
        })
      }
      else {
        this.priceService.addPrices(payload).subscribe(response => {
          if (response) {
            this.toastrService.success('Price added Successfully !', 'Success');
            this.form.reset();
            this.getallPrice()
          }
        }, (error) => {
          this.toastrService.error(error.error.message, 'Error')
        })
      }
    }
  }
}
