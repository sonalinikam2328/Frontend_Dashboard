import { Component } from '@angular/core';
import { PaymentService } from '../payment-collection-plan/payment.service';
import * as  moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import Swal from 'sweetalert2';




@Component({
  selector: 'app-development-cost-details',
  templateUrl: './development-cost-details.component.html',
  styleUrls: ['./development-cost-details.component.scss']
})
export class DevelopmentCostDetailsComponent {
  
  dataSource = []
  freezeHeader: boolean = true;
  branch = []
  angForm: FormGroup;
   
    

  maxDate: Date;
  maxDatet: Date;
  minDate: Date;

  constructor(private _PaymentService: PaymentService,
    
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }

 
 
  onFocus(ele: NgSelectComponent) {
    ele.open();
  }


  ngOnInit() {

    this._PaymentService.companylist().subscribe(response => {

      this.dataSource = response.List

    });

  }
}

