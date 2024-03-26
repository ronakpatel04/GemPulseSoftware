import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssignDiamondService } from 'src/app/services/assign-diamond.service';
import { IssueResolveFormComponent } from './issue-resolve-form/issue-resolve-form.component';

@Component({
  selector: 'app-issue-resolve-list',
  templateUrl: './issue-resolve-list.component.html',
  styleUrls: ['./issue-resolve-list.component.scss'],
  providers: [ConfirmationService]
})
export class IssueResolveListComponent implements OnInit {

  diamonds: any[] = [];
  loading: boolean = false;
  globalFilter!: string;
  dialogRef!: DynamicDialogRef;

  constructor(private assignDiamondService: AssignDiamondService, private dialogService: DialogService) { }
  ngOnInit(): void {
    this.polishingJobs();

  }


  handleReturnDiamond(diamond: any) {

    this.dialogRef = this.dialogService.open(IssueResolveFormComponent, {
      width: '30%',
      height: '40%',
      showHeader: false,
      data: {
        diamond: diamond
      }
    });

    this.dialogRef.onClose.subscribe(() => {
      this.polishingJobs();
    });


  }


  polishingJobs() {
    this.loading = true;
    this.assignDiamondService.polishingJobByissue().subscribe((response: any) => {
      this.diamonds = response.data;
      this.loading = false
    })
  }

}
