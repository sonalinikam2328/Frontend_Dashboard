import { Component, ViewChild } from '@angular/core';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../turn-over/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgSelectComponent } from "@ng-select/ng-select";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { AppComponentService } from 'src/app/app-component.service';


@Component({
  selector: 'app-customer-wise-plan-vs.-actual-sale',
  templateUrl: './customer-wise-plan-vs.-actual-sale.component.html',
  styleUrls: ['./customer-wise-plan-vs.-actual-sale.component.scss']
})
export class CustomerWisePlanVsActualSaleComponent {
  @ViewChild('YEAR_NAME', { static: false }) YEAR_NAME: NgSelectComponent;
  branch = []
  Tabledata = [];
  finyear = [];
  month = [];

  showtable: boolean = false
  isLoading1: boolean = false;
  isLoading: boolean = false;
  BRANCH: boolean = false;
  selectedBrach;
  selectedYear;
  selectedMonth;
  showBranch: boolean = true
  angForm: FormGroup;
  searchQuery: string = '';
  Keyarray = [];

  tableColumns = ['Customer Name', 'VA %', 'Planned Sale', 'Actual Sale',
    'Difference', 'VA Effect'];
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


  constructor(
    private _AppComponentService: AppComponentService,
    private _CustomerService: CustomerService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {

  }
  createForm() {
    this.angForm = this.fb.group({

      BRANCH_NAME: [""],
      YEAR_NAME: ["", Validators.required],
      MONTH_NAME: ["", Validators.required],

    });
  }

  onFocus(ele: NgSelectComponent) {
    ele.open();
  }


  @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;


  grouping: boolean = true;

  keyboardNavigation: boolean = true;

  dataSource = new window.Smart.DataAdapter({
    virtualDataSource: function (resultCallbackFunction: any, details: any) {
      const sqlQuery = details;
      const queryData = details.query;

      sqlQuery.query = JSON.stringify(queryData);
      // this.http.post('http://localhost:3000',details).subscribe((data: any)=>{
      //   console.log(data)
      // })
      new window.Smart.Ajax({
        // type:'post',
        url: environment.base_url + '/companyList',
        dataSourceType: 'json',
        data: sqlQuery
      }, (response: any) => {
        resultCallbackFunction({
          dataSource: response.List,
          virtualDataSourceLength: 10
        });
      });
    },
    dataFields: [
      'SUBGL_LONGNAME: string',
      'INVOICE_AMT: number',
      'CR_DAYS: number',
      'CREDIT_DAYS: number',
      'SUB_GLACNO: number',

    ]
  });
  filtering = true;
  filterRow = true;
  sortMode = 'one';
  paging = true;
  columnSizeMode = 'default';
  columns = [
    {
      label: 'SUBGL_LONGNAME', dataField: 'SUBGL_LONGNAME', formatFunction(settings: any) {
      },
    },
    { label: 'INVOICE_AMT', dataField: 'INVOICE_AMT' },
    { label: 'CR_DAYS', dataField: 'CR_DAYS' },
    { label: 'CREDIT_DAYS', dataField: 'CREDIT_DAYS' },

    {
      label: 'SUB_GLACNO', dataField: 'SUB_GLACNO', formatFunction(settings: any) {

      },
    },

  ];

  ngOnInit(): void {
    // onInit code.
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
        this.selectedBrach = this.branch[0]['CODE']

        this.isLoading1 = false

      } else {
        this.BRANCH = false;
        this.showBranch = false;
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

    });
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    const table = document.querySelector('smart-table');
    if (this.YEAR_NAME) {
      this.YEAR_NAME.focus();
    }
  }
  filterData() {
    const searchQueryLowerCase = this.searchQuery.toLowerCase().trim();
    this.Tabledata = this.tempdata.filter(item => {
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
  init(): void {
    // init code.
    const table = this.table;

    // table.addGroup('CREDIT_DAYS');
  }

  handleClick(event: Event, type: String) {
    this.table.exportData(type, 'table');
  }

  tempdata = []
  loadData() {
    this.isLoading = true;
    this.Tabledata = []
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);

    const formVal = this.angForm.value;
    let objdata = {
      BRANCH_NAME: this.selectedBrach,
      FINANCIAL_YEAR: this.selectedYear,
      CODE: result.COMPANY_ID

    }
    if (this.angForm.valid) {
      this._CustomerService.findAll(objdata).subscribe((res) => {
        this.showtable = true
        let obj = {}
        this.Tabledata = res.List
        this.tempdata = res.List

        this.isLoading = false;

      });
    } else {
      this.isLoading = false;

      Swal.fire('Warning', 'Please fill All Details Properly', 'info')
    }


  }

}


