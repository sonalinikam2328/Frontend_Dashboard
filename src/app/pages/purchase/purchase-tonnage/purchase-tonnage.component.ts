import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as  moment from 'moment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgSelectComponent } from "@ng-select/ng-select";
import { AppComponentService } from '../../../app-component.service';
import { PurchaseTonnageService } from './purchase-tonnage.service';
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
  Tabledata = []
  Tabledata1 = []
  suppliCate = []
  fromdate = null
  todate = null
  angForm: FormGroup;
  showBranch: boolean = false
  isLoading1: boolean = false;
  isLoading = false;
  BRANCH: boolean = false;
  showtable: boolean = false;
  showtable1: boolean = false;
  selectedBrach;
  selectedCategory
  Keyarray=[];
  searchQuery: string = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _AppComponentService: AppComponentService,
    private _PurchaseTonnageService: PurchaseTonnageService,
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
    this.fromdate = this.maxDate
    this.todate = this.minDate
  }

  ngOnInit(): void {
    this.createForm();
    this.isLoading1 = true
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    let obj = {
      CODE: result.COMPANY_ID
    }
    this._AppComponentService.branchList(obj).subscribe((res) => {
      if (res.List.length > 1) {
        this.showBranch = true;
        this.BRANCH = true
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
        this.BRANCH = false
        this.showBranch = false;
        this.branch = res.List
        this.isLoading1 = false
        this.selectedBrach = this.branch[0]['CODE']

      }
    });

    this._PurchaseTonnageService.suppliCate(obj).subscribe((res) => {
      this.suppliCate = res.List
      this.selectedCategory = this.suppliCate[0]['CODE']
    });

  }

  //validation
  createForm() {
    this.angForm = this.fb.group({
      FROM: ["", [Validators.required]], // control name
      TO: ["", [Validators.required]],
      SUPPLIERCATEGORY: ["", [Validators.required]],
      SUPPLIER: ["0", [Validators.required]],
      BRANCH_NAME: [""],

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

  loadData() {
    this.isLoading = true;

    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    const formVal = this.angForm.value;
    let newdata = ''
    let filteredUsers = this.Tabledata.filter((user) => {
      return user.checked == true;
    });
    if (formVal.SUPPLIER != 0) {
      for (let i = 0; i <= filteredUsers.length - 1; i++) {
        newdata = newdata + filteredUsers[i].SUB_GLACNO
      }

    } else {
      newdata = '0'
      filteredUsers.push(newdata)
    }
    if (filteredUsers.length != 0) {
      let objdata = {
        FROM: moment(this.fromdate, 'YYYY-MM-DD').format('YYYYMMDD'),
        TO: moment(this.todate, 'YYYY-MM-DD').format('YYYYMMDD'),
        category: this.selectedCategory,
        SUPPLIER: newdata,
        BRANCH_NAME: this.selectedBrach,
        CODE: result.COMPANY_ID
      }
      if (this.angForm.valid) {

        this._PurchaseTonnageService.findAll(objdata).subscribe((res) => {
          this.showtable = false
          this.showtable1 = true
          let obj = {}

          this.Tabledata1 = res.List
          this.Tabledata1.unshift(obj)
          this.Tabledata1.unshift(obj)
          this.isLoading = false;
        });

      } else {
        this.isLoading = false;

        Swal.fire('Warning', 'Please fill All Fields', 'info')
      }
    } else {
      Swal.fire('Warning', 'Please Select Supplier', 'info')
    }

  }

  check(val) {
    let objdata = {
      category: this.selectedCategory
    }
    if (val == '0') {
      this.showtable = false
      this.showtable1 = false

    } else {
      this._PurchaseTonnageService.supplier(objdata).subscribe((res) => {
        this.showtable = true
        this.showtable1 = false
        this.Tabledata = res.List
        for (let i = 0; i < this.Tabledata.length - 1; i++) {
          this.Tabledata[i]['checked'] = false
        }
      });

    }
  }


  onFocus(ele: NgSelectComponent) {
    ele.open();
  }
}
