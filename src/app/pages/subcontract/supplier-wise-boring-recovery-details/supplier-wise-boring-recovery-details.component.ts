import { Component, ElementRef, ViewChild } from '@angular/core';

import { SupplierWiseBoringService } from './supplier-wise-boring.service';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from '../../../../environments/environment';
import { NgSelectComponent } from "@ng-select/ng-select";
import * as  moment from 'moment';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AppComponentService } from 'src/app/app-component.service';
@Component({
  selector: 'app-supplier-wise-boring-recovery-details',
  templateUrl: './supplier-wise-boring-recovery-details.component.html',
  styleUrls: ['./supplier-wise-boring-recovery-details.component.scss']
})
export class SupplierWiseBoringRecoveryDetailsComponent {
  // @ViewChild('fdateInput', { static: false }) fdateInput: ElementRef;
  // @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  @ViewChild('FROM', { static: false })FROM: NgSelectComponent;
  onBranchNameFocus() {
    console.log('Branch Name Input Focused');
  }
  onFROMFocus(){
    console.log('From  Input Focused');
  }

  dataSource = []
  freezeHeader: boolean = true;

  angForm: FormGroup;
  branch = [];
  Tabledata = [];

  showBranch: boolean = true
  showtable: boolean = false
  isLoading1: boolean = false;
  isLoading: boolean = false;
  BRANCH: boolean = false;
  maxDate: Date;
  maxDatet: Date;
  minDate: Date;
  minDatet: Date;
  fromdate = null
  // todate = null
  selectedBrach
   fdateInput: any;

  constructor(
    private _SupplierWiseBoringService: SupplierWiseBoringService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    
  ) {
    let dt = new Date()
    this.minDate = new Date();
    this.maxDate = new Date(dt.getFullYear(), dt.getMonth(), 1);;
    this.minDatet = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());
    this.minDatet.setDate(this.maxDate.getDate() + 1);
    this.fromdate = this.maxDate
    // this.todate = this.minDate

  }
  
  ngAfterViewInit(): void {
    // afterViewInit code.
    const table = document.querySelector('smart-table');
    if (this.FROM) {
      this.FROM.focus();
    }
  }
  init() {
    throw new Error('Method not implemented.');
  }
  onFocus(ele: NgSelectComponent) {
    // console.log('Element focused:', Element);
    ele.open();
  }
  onValueChange(value: Date): void {
    this.maxDatet = new Date();

    this.maxDatet.setDate(this.maxDatet.getDate());
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
  createForm() {
    this.angForm = this.fb.group({
      FROM: ["", [Validators.required]], // control name
     
      BRANCH_NAME: [""],



    });
  }

  ngOnInit()
  
  // {
  //   setTimeout(() => {
  //     this.fdateInput.nativeElement.focus();
  //   }, 1);
    // this.fdateInput.nativeElement.focus();
    {
    this.createForm();
    this.isLoading1 = true
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    let obj = {
      CODE: result.COMPANY_ID
    }
    this._AppComponentService.branchList(obj).subscribe((res) => {
      if (res.List.length > 1) {
        this.BRANCH = true
        this.showBranch = true;
        let obj = {
          ADDRESS1: "",
          ADDRESS2: null,
          CITY_NAME: "",
          CODE: "0",
          EMAIL_ID: null,
          NAME: "ALL",
          PHONE_NO: "",
          PINCODE: "",
          PREFIX_NAME: null
        }
        res.List.unshift(obj);
        this.branch = res.List
        this.isLoading1 = false
        this.selectedBrach = this.branch[0]['CODE']
      } else {
        this.BRANCH = false;
        this.showBranch = false;
        this.branch = res.List;
        this.isLoading1 = false;
        this.selectedBrach = this.branch[0]['CODE']
      }
    });

  }
  refreshComponent(){
    this.router.navigate([this.router.url])
 }

  loadData() {
    this.isLoading = true;
    this.Tabledata = []
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);

    const formVal = this.angForm.value;
    let objdata = {
      FROM: moment(this.fromdate, 'YYYY-MM-DD').format('YYYYMMDD'),
      // TO: moment(this.todate, 'YYYY-MM-DD').format('YYYYMMDD'),
      BRANCH_NAME: this.selectedBrach,
      CODE: result.COMPANY_ID

    }

    if (this.angForm.valid) {
      this._SupplierWiseBoringService.findAll(objdata).subscribe((res) => {
        let obj = {}
        
        this.showtable = true
        this.Tabledata = res.List
        this.Tabledata.unshift(obj)
        this.Tabledata.unshift(obj)
        this.isLoading = false;

      });
    } else {
      this.isLoading = false;
      Swal.fire('Warning', 'Please fill All Details Properly', 'info')
    }


  }


}