import { Component, OnInit,Renderer2, ViewChild, ElementRef } from '@angular/core';
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

  
  @ViewChild('FROM', { static: false }) FROM: NgSelectComponent;
  @ViewChild('fdateInput') fdateInput: ElementRef;
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
  todate = null
  selectedBrach
  searchQuery: string = '';
  Keyarray=[];
 

  constructor(
    private _PaymentService: PaymentService,

    private _DevelopmentcostdetailsService: DevelopmentcostdetailsService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2,
  ) {
    let dt = new Date()
    this.minDate = new Date();
    this.maxDate = new Date(dt.getFullYear(), dt.getMonth(), 1);;
    this.minDatet = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());
    this.minDatet.setDate(this.maxDate.getDate() + 1);
    this.fromdate = this.maxDate
    this.todate = this.minDate

  }

  onFocus(ele: NgSelectComponent) {
    ele.open();
  }

  ngAfterViewInit(): void {
   
    const table = document.querySelector('smart-table');
    this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
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
      BRANCH_NAME: [""],



    });
  }
  filterData() {
    const searchQueryLowerCase = this.searchQuery.toLowerCase().trim();
    this.Tabledata = this.Keyarray.filter(item => {
      const values = Object.values(item);
      return values.some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQueryLowerCase);
        } else if (typeof value === 'number') {
          return value.toString().includes(searchQueryLowerCase);
        }
        return false;
      });
    });
    console.log('Tabledata', this.Tabledata);
  }



  ngOnInit() {
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
      setTimeout(() => {
        this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
      }, 100);
    });

  }
  totalDevelopmentCost
  totalDevelopmentCostReceived
  totalBalanceDcinReceived
  loadData() {
    this.isLoading = true;
    this.Tabledata = []
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);

    const formVal = this.angForm.value;
    let objdata = {
      FROM: moment(this.fromdate, 'YYYY-MM-DD').format('YYYYMMDD'),
      TO: moment(this.todate, 'YYYY-MM-DD').format('YYYYMMDD'),
      BRANCH_NAME: this.selectedBrach,
      CODE: result.COMPANY_ID

    }

    if (this.angForm.valid) {
      this._DevelopmentcostdetailsService.findAll(objdata).subscribe((res) => {
        this.totalDevelopmentCost = 0
        this.totalDevelopmentCostReceived = 0
        this.totalBalanceDcinReceived = 0
        let obj = {}
        
        this.showtable = true
        this.Tabledata = res.List
        let first = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.ORDER_AMT;
        }, 0);
        this.totalDevelopmentCost = parseFloat(first).toFixed(2)
        let second = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.INVOICE_AMT;
        }, 0);
        this.totalDevelopmentCostReceived = parseFloat(second).toFixed(2)
        let third = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.DIFF_AMT;
        }, 0);
        this.totalBalanceDcinReceived = parseFloat(third).toFixed(2)

        

        this.isLoading = false;

      });
    } else {
      this.isLoading = false;
      Swal.fire('Warning', 'Please fill All Details Properly', 'info')
    }


  }


}





