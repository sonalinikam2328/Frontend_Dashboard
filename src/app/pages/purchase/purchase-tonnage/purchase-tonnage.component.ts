import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as  moment from 'moment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgSelectComponent } from "@ng-select/ng-select";

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
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }

  ngOnInit(): void {
    this.createForm();

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
