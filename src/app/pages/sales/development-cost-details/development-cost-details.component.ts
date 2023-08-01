import { Component } from '@angular/core';
import { PaymentService } from '../payment-collection-plan/payment.service';

@Component({
  selector: 'app-development-cost-details',
  templateUrl: './development-cost-details.component.html',
  styleUrls: ['./development-cost-details.component.scss']
})
export class DevelopmentCostDetailsComponent {
  dataSource = []
  freezeHeader: boolean = true;

  constructor(private _PaymentService: PaymentService) { }

  ngOnInit() {

    this._PaymentService.companylist().subscribe(response => {

      this.dataSource = response.List

    });

  }
}

