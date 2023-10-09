import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from './payment.service';
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
  selector: 'app-payment-collection-plan',
  templateUrl: './payment-collection-plan.component.html',
  styleUrls: ['./payment-collection-plan.component.scss']
})
export class PaymentCollectionPlanComponent implements AfterViewInit, OnInit {
  @ViewChild('YEAR_NAME', { static: false }) YEAR_NAME: NgSelectComponent;
  // @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  branch = []
  finyear = [];
  Keyarray=[];
  selectedBrach;
  selectedYear;
  selectedMonth;
  angForm: FormGroup;
  showBranch: boolean = true
  showtable: boolean = false;
  isLoading1: boolean = false;
  BRANCH: boolean = false;
  isLoading = false;
  Loading: any;
  month = [];
  currentMonth
  priviousOne
  priviousTwo
  priviousThree
  priviousFour
  priviousFive
  MonthData
  searchQuery: string = '';

  tableColumns = ['Sr. No.', 'Name of Customer','Payment Amount Plan For The Month Rs.','Amount Received Rs.','% of Recovery','Credit Day','Avg Payment Receipt Days','Avg Payment Receipt Days','Avg Payment Receipt Days','Avg Payment Receipt Days','Avg Payment Receipt Days','Avg Payment Receipt Days']; 
  isFilterOpen: { [key: string]: boolean } = {};
  isFilterInputOpen: { [key: string]: boolean } = {};
column: any;
values: any;

  toggleFilter(column: string) {
    this.isFilterOpen[column] = !this.isFilterOpen[column];
    this.isFilterInputOpen[column] = false; // Close the input box when toggling the filter
  }

  applyFilter(column: string, filterOption: string) {
    // Implement your filtering logic here based on the column and filterOption
    console.log(`Filter applied for ${column} with option: ${filterOption}`);
  }

  toggleFilterInput(column: string) {
    this.isFilterInputOpen[column] = !this.isFilterInputOpen[column];
  }

  constructor(private _PaymentService: PaymentService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,) {
  }

  createForm() {
    this.angForm = this.fb.group({

      BRANCH_NAME: [""],
      YEAR_NAME: ["", Validators.required],
      CUTOMER_TYPE: ["0", Validators.required],
      MONTH_NAME: ["", Validators.required],


    });
  }

  onFocus(ele: NgSelectComponent) {
    ele.open();
  }
  ngAfterViewInit(): void {
    // afterViewInit code

    const table = document.querySelector('smart-table');
    if (this.YEAR_NAME) {
      this.YEAR_NAME.focus();
    }
  }
  init() {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    // onInit code.
    this.isLoading1 = true
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    let obj = {
      CODE: result.COMPANY_ID
    }
    this.createForm();
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
        this.showBranch = false;
        this.BRANCH = false
        this.branch = res.List
        this.isLoading1 = false
        this.selectedBrach = this.branch[0]['CODE']
      }
    });

    this._AppComponentService.financialYear(obj).subscribe((res) => {
      this.finyear = res.List
      this.selectedYear = this.finyear[0]['DATEVALUE']
    });
    this._AppComponentService.month(obj).subscribe((res) => {
      this.month = res.List
      this.selectedMonth = this.month[0]['DateValue']
      let filteredUsers = this.month.filter((user) => {
        return user.DateValue == this.selectedMonth;
      });
      this.MonthData = filteredUsers
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
  Tabledata = []
  FooterData = []
  loadData() {
    this.Tabledata = []
    this.FooterData = []
    this.isLoading = true;

    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    const formVal = this.angForm.value;

    let objdata = {
      BRANCH_NAME: this.selectedBrach,
      FINANCIAL_YEAR: this.selectedYear,
      CODE: result.COMPANY_ID,
      CUSTOMER_TYPE: formVal.CUTOMER_TYPE,
      MONTH: this.selectedMonth,
    }

    if (this.angForm.valid) {
      this._PaymentService.findAll(objdata).subscribe((res) => {
        this.upmonth()
        let obj = {}
        this.showtable = true
        this.FooterData.push(res.List[res.List.length - 1])
        this.Tabledata = res.List
        this.Tabledata.pop()
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      if (this.selectedBrach == null && this.selectedYear == null) {
        Swal.fire('Warning', 'Please select branch and financial year', 'info')
      } else if (this.selectedBrach == null) {
        Swal.fire('Warning', 'Please select branch', 'info')
      } else if (this.selectedYear == null) {
        Swal.fire('Warning', 'Please select financial year', 'info')
      }
    }
  }

  upmonth() {
    let date;
    let result1 = this.selectedYear.substr(0, 4);
    let result2 = this.selectedYear.substr(4, 4);
    this.MonthData
    let result3 = this.selectedMonth.substr(0, 2);
    let result4 = this.MonthData[0].DateDesc;

    if (result3 > '03') {

      date = result4 + ' ' + result2
    } else {
      date = result4 + ' ' + result1
    }

    this.currentMonth = date
    let checkdate = moment(this.currentMonth, 'MMM/YYYY').format('YYYY-MM-DD')
    this.priviousOne = moment(checkdate,'YYYY-MM-DD').subtract(1, 'months').format('MMM-YYYY');
    this.priviousTwo = moment(checkdate,'YYYY-MM-DD').subtract(2, 'months').format('MMM-YYYY');
    this.priviousThree = moment(checkdate,'YYYY-MM-DD').subtract(3, 'months').format('MMM-YYYY');
    this.priviousFour = moment(checkdate,'YYYY-MM-DD').subtract(4, 'months').format('MMM-YYYY');
    this.priviousFive = moment(checkdate,'YYYY-MM-DD').subtract(5, 'months').format('MMM-YYYY');

  }


  getMonth() {
    let filteredUsers = this.month.filter((user) => {
      return user.DateValue == this.selectedMonth;
    });
    this.MonthData = filteredUsers
  }


}
