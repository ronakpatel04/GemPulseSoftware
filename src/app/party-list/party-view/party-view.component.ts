import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-party-view',
  templateUrl: './party-view.component.html',
  styleUrls: ['./party-view.component.scss']
})
export class PartyViewComponent {
  party: any

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private toastrservice: ToastrService) {
  }

  ngOnInit(): void {

    this.party = this.config.data.party;
  }


}
