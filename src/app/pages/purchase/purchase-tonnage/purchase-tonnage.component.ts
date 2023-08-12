import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as  moment from 'moment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgSelectComponent } from "@ng-select/ng-select";
import { AppComponentService } from '../../../app-component.service';
import { SupplierwisePurchaseService } from '../supplierwise-purchase-and-cr-in-tons/supplierwise-purchase.service';
@Component({
  selector: 'app-purchase-tonnage',
  templateUrl: './purchase-tonnage.component.html',
  styleUrls: ['./purchase-tonnage.component.scss']
})
export class PurchaseTonnageComponent {
  maxDate: Date;
  maxDatet: Date;
  minDate: Date;
  branch = []
  suppliCate = []
  angForm: FormGroup;
  showBranch: boolean = false
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _AppComponentService: AppComponentService,
    private _SupplierwisePurchaseService: SupplierwisePurchaseService,
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());
  }

  ngOnInit(): void {
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

    this._SupplierwisePurchaseService.suppliCate().subscribe((res) => {
      this.suppliCate = res.List
    });

  }

  //validation
  createForm() {
    this.angForm = this.fb.group({
      GSTIN_NO: ["", [Validators.required, Validators.maxLength, Validators.minLength]],
      NAME: ["", [Validators.required]],
      TRADE_NAME: ["", [Validators.required]],
      ADDR1: ["", [Validators.required]],
      ADDR2: ["", [Validators.required]],
      CITY: ["", [Validators.required]],
      PIN_CODE: ["", [Validators.required, Validators.maxLength, Validators.minLength]],
      STATE_CODE: ["", [Validators.required, Validators.maxLength, Validators.minLength]],
      PHONE_NO: ["", [Validators.required]],
      EMAIL_ID: ["", [Validators.required, Validators.pattern]],
      API_PASSWORD: [""],
      TOLERANCE_AMT: [""],
      FILE: [""]

    });
  }

  onValueChange(value: Date): void {
    this.maxDatet = new Date();

    // this.maxDatet.setDate(this.maxDatet.getDate());
    // if (this.fromdate != null && this.todate != null) {

    //   let from = this.fromdate.getFullYear() + '/' + (this.fromdate.getMonth() + 1) + '/' + this.fromdate.getDate()
    //   let to = this.todate.getFullYear() + '/' + (this.todate.getMonth() + 1) + '/' + this.todate.getDate()

    //   if (from == to) {
    //     Swal.fire('Error', 'From date and To date not be equal', 'error');
    //     this.angForm.controls['TO'].reset()
    //   }

    //   if (from > to) {
    //     Swal.fire('Error', 'To date is must be less than From date', 'error');
    //     this.angForm.controls['TO'].reset()
    //   }

    // }

  }


  onFocus(ele: NgSelectComponent) {
    ele.open();
  }
}
