import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../payment-collection-plan/payment.service';
import * as  moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

import { DevelopmentcostdetailsService } from './developmentcostdetails.service';
import { AppComponentService } from 'src/app/app-component.service';
@Component({
  selector: 'app-development-cost-details',
  templateUrl: './development-cost-details.component.html',
  styleUrls: ['./development-cost-details.component.scss']
})
export class DevelopmentCostDetailsComponent implements OnInit {

  dataSource = []
  freezeHeader: boolean = true;

  angForm: FormGroup;
  branch = [];
  showBranch: boolean = true

  maxDate: Date;
  maxDatet: Date;
  minDate: Date;
  minDatet: Date;
  fromdate = null
  todate = null
  selectedBrach

  constructor(
    private _PaymentService: PaymentService,

    private _DevelopmentcostdetailsService: DevelopmentcostdetailsService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
    // this.minDatet.setDate(this.maxDate.getDate() + 1);
    this.fromdate = this.maxDate
    // this.todate = this.minDatet

  }

  onFocus(ele: NgSelectComponent) {
    ele.open();
  }
  onValueChange(value: Date): void {
    this.maxDatet = new Date();

    this.maxDatet.setDate(this.maxDatet.getDate());
    if (this.fromdate != null && this.todate != null) {

      let from = this.fromdate.getFullYear() + '/' + (this.fromdate.getMonth() + 1) + '/' + this.fromdate.getDate()
      let to = this.todate.getFullYear() + '/' + (this.todate.getMonth() + 1) + '/' + this.todate.getDate()

      if (from == to) {
        Swal.fire('Error', 'From date and To date not be equal', 'error');
        this.angForm.controls['TO'].reset()
      }

      if (from > to) {
        Swal.fire('Error', 'To date is must be less than From date', 'error');
        this.angForm.controls['TO'].reset()
      }

    }

  }
  createForm() {
    this.angForm = this.fb.group({
      FROM: ["", [Validators.required]], // control name
      TO: ["", [Validators.required]],
      BRANCH_NAME: ["", Validators.required],
      


    });
  }

  ngOnInit() {
    this.createForm();
    this._AppComponentService.branchList().subscribe((res) => {
      console.log(res.List)
      if (res.List.length > 1) {
        this.showBranch = true;
        let obj = {
          ADDRESS1: "",
          ADDRESS2: null,
          CITY_NAME: "",
          CODE: "100",
          EMAIL_ID: null,
          NAME: "ALL",
          PHONE_NO: "",
          PINCODE: "",
          PREFIX_NAME: null
        }
        res.List.unshift(obj);
        this.branch = res.List
      } else {
        this.showBranch = false;
        this.branch = res.List
      }
    });
    this._PaymentService.companylist().subscribe(response => {
      this.dataSource = response.List
    });

  }

  loadData() {
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);

    const formVal = this.angForm.value;
    let objdata = {
      FROM: moment(this.fromdate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      TO: moment(this.todate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      BRANCH_NAME: this.selectedBrach
    }
    if (this.angForm.valid) {
      this._DevelopmentcostdetailsService.findAll(objdata).subscribe((newdata) => {

      }, err => {
        Swal.fire('Warning', err, 'info')
      })
    } else {

      Swal.fire('Warning', 'Please fill from and to date', 'info')
    }


  }


}





