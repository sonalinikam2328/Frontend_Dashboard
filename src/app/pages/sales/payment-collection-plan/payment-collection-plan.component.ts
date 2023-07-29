import { Component, ViewChild } from '@angular/core';
import { PaymentService } from './payment.service';
// import { TableComponent, TableColumn } from 'smart-webcomponents-angular/table';

@Component({
  selector: 'app-payment-collection-plan',
  templateUrl: './payment-collection-plan.component.html',
  styleUrls: ['./payment-collection-plan.component.scss']
})
export class PaymentCollectionPlanComponent {

  // @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  dataSource = []
  freezeHeader: boolean = true;

  constructor(private _PaymentService: PaymentService) { }

  ngOnInit() {

    this._PaymentService.companylist().subscribe(response => {

      this.dataSource = response.List

    });

  }




}
