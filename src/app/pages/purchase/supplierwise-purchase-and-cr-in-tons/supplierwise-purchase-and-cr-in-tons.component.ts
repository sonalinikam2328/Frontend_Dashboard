import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { TableComponent } from '@smart-webcomponents-angular/table';
import { environment } from 'src/environments/environment';
import * as  moment from 'moment';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgSelectComponent } from "@ng-select/ng-select";

import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { SupplierwisePurchaseService } from './supplierwise-purchase.service';

import { AppComponentService } from 'src/app/app-component.service';

@Component({
  selector: 'app-supplierwise-purchase-and-cr-in-tons',
  templateUrl: './supplierwise-purchase-and-cr-in-tons.component.html',
  styleUrls: ['./supplierwise-purchase-and-cr-in-tons.component.scss']
})
export class SupplierwisePurchaseAndCRInTonsComponent {
  @ViewChild('YEAR_NAME', { static: false }) YEAR_NAME: NgSelectComponent;
  branch = [];
  Tabledata = [];
  finyear = [];
Keyarray=[];
  searchQuery: string = '';
  Jan: boolean = false
  Feb: boolean = false
  March: boolean = false
  Apr: boolean = false
  May: boolean = false
  June: boolean = false
  July: boolean = false
  Aug: boolean = false
  sept: boolean = false
  Oct: boolean = false
  Nov: boolean = false
  Dec: boolean = false


  TOTAL_JAN_GRN_QTY
  TOTAL_JAN_CR_QTY
  TOTAL_JAN_SCH_QTY
  TOTAL_JAN_DELV_RATE1
  TOTAL_JAN_DEVL_RATE2
  TOTAL_JAN_QUAL_RATE
  TOTAL_FEB_GRN_QTY
  TOTAL_FEB_CR_QTY
  TOTAL_FEB_SCH_QTY
  TOTAL_FEB_DELV_RATE1
  TOTAL_FEB_DEVL_RATE2
  TOTAL_FEB_QUAL_RATE
  TOTAL_MAR_GRN_QTY
  TOTAL_MAR_CR_QTY
  TOTAL_MAR_SCH_QTY
  TOTAL_MAR_DELV_RATE1
  TOTAL_MAR_DEVL_RATE2
  TOTAL_MAR_QUAL_RATE
  TOTAL_APR_GRN_QTY
  TOTAL_APR_CR_QTY
  TOTAL_APR_SCH_QTY
  TOTAL_APR_DELV_RATE1
  TOTAL_APR_DEVL_RATE2
  TOTAL_APR_QUAL_RATE
  TOTAL_MAY_GRN_QTY
  TOTAL_MAY_CR_QTY
  TOTAL_MAY_SCH_QTY
  TOTAL_MAY_DELV_RATE1
  TOTAL_MAY_DEVL_RATE2
  TOTAL_MAY_QUAL_RATE
  TOTAL_JUNE_GRN_QTY
  TOTAL_JUNE_CR_QTY
  TOTAL_JUNE_SCH_QTY
  TOTAL_JUNE_DELV_RATE1
  TOTAL_JUNE_DEVL_RATE2
  TOTAL_JUNE_QUAL_RATE
  TOTAL_JULY_GRN_QTY
  TOTAL_JULY_CR_QTY
  TOTAL_JULY_SCH_QTY
  TOTAL_JULY_DELV_RATE1
  TOTAL_JULY_DEVL_RATE2
  TOTAL_JULY_QUAL_RATE
  TOTAL_AUG_GRN_QTY
  TOTAL_AUG_CR_QTY
  TOTAL_AUG_SCH_QTY
  TOTAL_AUG_DELV_RATE1
  TOTAL_AUG_DEVL_RATE2
  TOTAL_AUG_QUAL_RATE
  TOTAL_SEPT_GRN_QTY
  TOTAL_SEPT_CR_QTY
  TOTAL_SEPT_SCH_QTY
  TOTAL_SEPT_DELV_RATE1
  TOTAL_SEPT_DEVL_RATE2
  TOTAL_SEPT_QUAL_RATE
  TOTAL_OCT_GRN_QTY
  TOTAL_OCT_CR_QTY
  TOTAL_OCT_SCH_QTY
  TOTAL_OCT_DELV_RATE1
  TOTAL_OCT_DEVL_RATE2
  TOTAL_OCT_QUAL_RATE
  TOTAL_NOV_GRN_QTY
  TOTAL_NOV_CR_QTY
  TOTAL_NOV_SCH_QTY
  TOTAL_NOV_DELV_RATE1
  TOTAL_NOV_DEVL_RATE2
  TOTAL_NOV_QUAL_RATE
  TOTAL_DEC_GRN_QTY
  TOTAL_DEC_CR_QTY
  TOTAL_DEC_SCH_QTY
  TOTAL_DEC_DELV_RATE1
  TOTAL_DEC_DEVL_RATE2
  TOTAL_DEC_QUAL_RATE
  showtable1: boolean = false
  selectedBrach;
  selectedYear;
  angForm: FormGroup;
  showBranch: boolean = true
  isLoading: boolean = false
  isLoading1: boolean = false
  BRANCH: boolean = false
  showtable: boolean = false
  @ViewChild('fdateInput') fdateInput: ElementRef;

 
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
    private _SupplierwisePurchaseService: SupplierwisePurchaseService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2,

  ) { }


  onFocus(ele: NgSelectComponent) {
    ele.open();
  }

  createForm() {
    this.angForm = this.fb.group({

      BRANCH_NAME: [""],
      YEAR_NAME: ["", Validators.required],




    });


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
    this.isLoading1 = true
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    let obj = {
      CODE: result.COMPANY_ID
    }
    this.createForm();
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

      } else {
        this.BRANCH = false
        this.showBranch = false;
        this.branch = res.List
        this.isLoading1 = false
        this.selectedBrach = this.branch[0]['CODE']

      }
      setTimeout(() => {
        this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
      }, 100);
    });

    this._AppComponentService.financialYear(obj).subscribe((res) => {
      this.finyear = res.List
      this.selectedYear = this.finyear[0]['DATEVALUE']

    });
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();

    this.init();
    const table = document.querySelector('smart-table');
    if (this.YEAR_NAME) {
      this.YEAR_NAME.focus();
    }
  }

  init(): void {
    // init code.
    const table = this.table;

    // table.addGroup('CREDIT_DAYS');
  }

  handleClick(event: Event, type: String) {
    this.table.exportData(type, 'table');
  }

  filterData() {
    const searchQueryLowerCase = this.searchQuery.toLowerCase().trim();
    this.Tabledata = this.tempData.filter(item => {
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

  tempData = []

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
      this._SupplierwisePurchaseService.findAll(objdata).subscribe((newdata) => {
        this.showtable = true
        let obj = {}

        this.Tabledata = newdata.List
        this.tempData = this.Tabledata
        // jan
        let first = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JAN_GRN_QTY;
        }, 0);
        this.TOTAL_JAN_GRN_QTY = parseFloat(first).toFixed(2)

        let second = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JAN_CR_QTY;
        }, 0);
        this.TOTAL_JAN_CR_QTY = parseFloat(second).toFixed(2)

        let third = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JAN_SCH_QTY;
        }, 0);
        this.TOTAL_JAN_SCH_QTY = parseFloat(third).toFixed(2)

        let fourth = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JAN_DELV_RATE1;
        }, 0);
        this.TOTAL_JAN_DELV_RATE1 = parseFloat(fourth).toFixed(2)

        let fifth = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JAN_DEVL_RATE2;
        }, 0);
        this.TOTAL_JAN_DEVL_RATE2 = fifth
        let sixth = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JAN_QUAL_RATE;
        }, 0);
        this.TOTAL_JAN_QUAL_RATE = parseFloat(sixth).toFixed(2)

        // feb
        let first1 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.FEB_GRN_QTY;
        }, 0);
        this.TOTAL_FEB_GRN_QTY = parseFloat(first1).toFixed(2)

        let second1 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.FEB_CR_QTY;
        }, 0);
        this.TOTAL_FEB_CR_QTY = parseFloat(second1).toFixed(2)

        let third1 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.FEB_SCH_QTY;
        }, 0);
        this.TOTAL_FEB_SCH_QTY = parseFloat(third1).toFixed(2)

        let fourth1 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.FEB_DELV_RATE1;
        }, 0);
        this.TOTAL_FEB_DELV_RATE1 = parseFloat(fourth1).toFixed(2)

        let fifth1 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.FEB_DEVL_RATE2;
        }, 0);
        this.TOTAL_FEB_DEVL_RATE2 = parseFloat(fifth1).toFixed(2)
        let sixth1 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.FEB_QUAL_RATE;
        }, 0);
        this.TOTAL_FEB_QUAL_RATE = parseFloat(sixth1).toFixed(2)
        //march
        let first2 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAR_GRN_QTY;
        }, 0);
        this.TOTAL_MAR_GRN_QTY = parseFloat(first2).toFixed(2)
        let second2 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAR_CR_QTY;
        }, 0);
        this.TOTAL_MAR_CR_QTY = parseFloat(second2).toFixed(2)
        let third2 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAR_SCH_QTY;
        }, 0);
        this.TOTAL_MAR_SCH_QTY = parseFloat(third2).toFixed(2)
        let fourth2 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAR_DELV_RATE1;
        }, 0);
        this.TOTAL_MAR_DELV_RATE1 = parseFloat(fourth2).toFixed(2)
        let fifth2 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAR_DEVL_RATE2;
        }, 0);
        this.TOTAL_MAR_DEVL_RATE2 = parseFloat(fifth2).toFixed(2)
        let sixth2 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAR_QUAL_RATE;
        }, 0);
        this.TOTAL_MAR_QUAL_RATE = parseFloat(sixth2).toFixed(2)
        //april
        let first3 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.APR_GRN_QTY;
        }, 0);
        this.TOTAL_APR_GRN_QTY = parseFloat(first3).toFixed(2)
        let second3 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.APR_CR_QTY;
        }, 0);
        this.TOTAL_APR_CR_QTY = parseFloat(second3).toFixed(2)
        let third3 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.APR_SCH_QTY;
        }, 0);
        this.TOTAL_APR_SCH_QTY = parseFloat(third3).toFixed(2)
        let fourth3 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.APR_DELV_RATE1;
        }, 0);
        this.TOTAL_APR_DELV_RATE1 = parseFloat(fourth3).toFixed(2)
        let fifth3 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.APR_DEVL_RATE2;
        }, 0);
        this.TOTAL_APR_DEVL_RATE2 = parseFloat(fifth3).toFixed(2)
        let sixth3 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.APR_QUAL_RATE;
        }, 0);
        this.TOTAL_APR_QUAL_RATE = parseFloat(sixth3).toFixed(2)

        //may
        let first4 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAY_GRN_QTY;
        }, 0);
        this.TOTAL_MAY_GRN_QTY = parseFloat(first4).toFixed(2)
        let second4 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAY_CR_QTY;
        }, 0);
        this.TOTAL_MAY_CR_QTY = parseFloat(second4).toFixed(2)
        let third4 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAY_SCH_QTY;
        }, 0);
        this.TOTAL_MAY_SCH_QTY = parseFloat(third4).toFixed(2)
        let fourth4 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAY_DELV_RATE1;
        }, 0);
        this.TOTAL_MAY_DELV_RATE1 = parseFloat(fourth4).toFixed(2)
        let fifth4 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAY_DEVL_RATE2;
        }, 0);
        this.TOTAL_MAY_DEVL_RATE2 = parseFloat(fifth4).toFixed(2)

        let sixth4 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.MAY_QUAL_RATE;
        }, 0);
        this.TOTAL_MAY_QUAL_RATE = parseFloat(sixth4).toFixed(2)

        //Jun
        let first5 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JUNE_GRN_QTY;
        }, 0);
        this.TOTAL_JUNE_GRN_QTY = parseFloat(first5).toFixed(2)
        let second5 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JUNE_CR_QTY;
        }, 0);
        this.TOTAL_JUNE_CR_QTY = parseFloat(second5).toFixed(2)
        let third5 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JUNE_SCH_QTY;
        }, 0);
        this.TOTAL_JUNE_SCH_QTY = parseFloat(third5).toFixed(2)
        let fourth5 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JUNE_DELV_RATE1;
        }, 0);
        this.TOTAL_JUNE_DELV_RATE1 = parseFloat(fourth5).toFixed(2)
        let fifth5 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JUNE_DEVL_RATE2;
        }, 0);
        this.TOTAL_JUNE_DEVL_RATE2 = parseFloat(fifth5).toFixed(2)
        let sixth5 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JUNE_QUAL_RATE;
        }, 0);
        this.TOTAL_JUNE_QUAL_RATE = parseFloat(sixth5).toFixed(2)

        //July
        let first6 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JULY_GRN_QTY;
        }, 0);
        this.TOTAL_JULY_GRN_QTY = parseFloat(first6).toFixed(2)
        let second6 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JULY_CR_QTY;
        }, 0);
        this.TOTAL_JULY_CR_QTY = parseFloat(second6).toFixed(2)
        let third6 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JULY_SCH_QTY;
        }, 0);
        this.TOTAL_JULY_SCH_QTY = parseFloat(third6).toFixed(2)
        let fourth6 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JULY_DELV_RATE1;
        }, 0);
        this.TOTAL_JULY_DELV_RATE1 = parseFloat(fourth6).toFixed(2)
        let fifth6 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JULY_DEVL_RATE2;
        }, 0);
        this.TOTAL_JULY_DEVL_RATE2 = parseFloat(fifth6).toFixed(2)
        let sixth6 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.JULY_QUAL_RATE;
        }, 0);
        this.TOTAL_JULY_QUAL_RATE = parseFloat(sixth6).toFixed(2)

        //Aug
        let first7 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.AUG_GRN_QTY;
        }, 0);
        this.TOTAL_AUG_GRN_QTY = parseFloat(first7).toFixed(2)
        let second7 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.AUG_CR_QTY;
        }, 0);
        this.TOTAL_AUG_CR_QTY = parseFloat(second7).toFixed(2)
        let third7 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.AUG_SCH_QTY;
        }, 0);
        this.TOTAL_AUG_SCH_QTY = parseFloat(third7).toFixed(2)
        let fourth7 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.AUG_DELV_RATE1;
        }, 0);
        this.TOTAL_AUG_DELV_RATE1 = parseFloat(fourth7).toFixed(2)
        let fifth7 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.AUG_DEVL_RATE2;
        }, 0);
        this.TOTAL_AUG_DEVL_RATE2 = parseFloat(fifth7).toFixed(2)
        let sixth7 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.AUG_QUAL_RATE;
        }, 0);
        this.TOTAL_AUG_QUAL_RATE = parseFloat(sixth7).toFixed(2)

        //SEPT
        let first8 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.SEPT_GRN_QTY;
        }, 0);
        this.TOTAL_SEPT_GRN_QTY = parseFloat(first8).toFixed(2)
        let second8 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.SEPT_CR_QTY;
        }, 0);
        this.TOTAL_SEPT_CR_QTY = parseFloat(second8).toFixed(2)
        let third8 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.SEPT_SCH_QTY;
        }, 0);
        this.TOTAL_SEPT_SCH_QTY = parseFloat(third8).toFixed(2)
        let fourth8 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.SEPT_DELV_RATE1;
        }, 0);
        this.TOTAL_SEPT_DELV_RATE1 = parseFloat(fourth8).toFixed(2)
        let fifth8 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.SEPT_DEVL_RATE2;
        }, 0);
        this.TOTAL_SEPT_DEVL_RATE2 = parseFloat(fifth8).toFixed(2)
        let sixth8 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.SEPT_QUAL_RATE;
        }, 0);
        this.TOTAL_SEPT_QUAL_RATE = parseFloat(sixth8).toFixed(2)

        //OCT
        let first9 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.OCT_GRN_QTY;
        }, 0);
        this.TOTAL_OCT_GRN_QTY = parseFloat(first9).toFixed(2)
        let second9 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.OCT_CR_QTY;
        }, 0);
        this.TOTAL_OCT_CR_QTY = parseFloat(second9).toFixed(2)
        let third9 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.OCT_SCH_QTY;
        }, 0);
        this.TOTAL_OCT_SCH_QTY = parseFloat(third9).toFixed(2)
        let fourth9 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.OCT_DELV_RATE1;
        }, 0);
        this.TOTAL_OCT_DELV_RATE1 = parseFloat(fourth9).toFixed(2)
        let fifth9 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.OCT_DEVL_RATE2;
        }, 0);
        this.TOTAL_OCT_DEVL_RATE2 = parseFloat(fifth9).toFixed(2)
        let sixth9 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.OCT_QUAL_RATE;
        }, 0);
        this.TOTAL_OCT_QUAL_RATE = parseFloat(sixth9).toFixed(2)

        //NOV
        let first10 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.NOV_GRN_QTY;
        }, 0);
        this.TOTAL_NOV_GRN_QTY = parseFloat(first10).toFixed(2)
        let second10 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.NOV_CR_QTY;
        }, 0);
        this.TOTAL_NOV_CR_QTY = parseFloat(second10).toFixed(2)
        let third10 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.NOV_SCH_QTY;
        }, 0);
        this.TOTAL_NOV_SCH_QTY = parseFloat(third10).toFixed(2)
        let fourth10 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.NOV_DELV_RATE1;
        }, 0);
        this.TOTAL_NOV_DELV_RATE1 = parseFloat(fourth10).toFixed(2)
        let fifth10 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.NOV_DEVL_RATE2;
        }, 0);
        this.TOTAL_NOV_DEVL_RATE2 = parseFloat(fifth10).toFixed(2)
        let sixth10 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.NOV_QUAL_RATE;
        }, 0);
        this.TOTAL_NOV_QUAL_RATE = parseFloat(sixth10).toFixed(2)

        //DEC
        let first11 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.DEC_GRN_QTY;
        }, 0);
        this.TOTAL_DEC_GRN_QTY = parseFloat(first11).toFixed(2)
        let second11 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.DEC_CR_QTY;
        }, 0);
        this.TOTAL_DEC_CR_QTY = parseFloat(second11).toFixed(2)
        let third11 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.DEC_SCH_QTY;
        }, 0);
        this.TOTAL_DEC_SCH_QTY = parseFloat(third11).toFixed(2)
        let fourth11 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.DEC_DELV_RATE1;
        }, 0);
        this.TOTAL_DEC_DELV_RATE1 = parseFloat(fourth11).toFixed(2)
        let fifth11 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.DEC_DEVL_RATE2;
        }, 0);
        this.TOTAL_DEC_DEVL_RATE2 = parseFloat(fifth11).toFixed(2)
        let sixth11 = this.Tabledata.reduce((accumulator, object) => {
          return accumulator + object.DEC_QUAL_RATE;
        }, 0);
        this.TOTAL_DEC_QUAL_RATE = parseFloat(sixth11).toFixed(2)


        // this.Tabledata.unshift(obj)
        // this.Tabledata.unshift(obj)
        this.isLoading = false;

      }, err => {
        this.isLoading = false;

        Swal.fire('Warning', err, 'info')
      })
    } else {
      this.isLoading = false;

      Swal.fire('Warning', 'Please fill All Details', 'info')
    }


  }

  checkhyperlink(val) {
    if (val == 1) {
      this.showtable1 = true
      this.showtable = false
      this.Jan = false
      this.Feb = false
      this.March = false
      this.Apr = true
      this.May = true
      this.June = true
      this.July = false
      this.Aug = false
      this.sept = false
      this.Oct = false
      this.Nov = false
      this.Dec = false
    } else if (val == 2) {
      this.showtable1 = true
      this.showtable = false
      this.Jan = false
      this.Feb = false
      this.March = false
      this.Apr = false
      this.May = false
      this.June = false
      this.July = true
      this.Aug = true
      this.sept = true
      this.Oct = false
      this.Nov = false
      this.Dec = false
    } else if (val == 3) {
      this.showtable1 = true
      this.showtable = false
      this.Jan = false
      this.Feb = false
      this.March = false
      this.Apr = false
      this.May = false
      this.June = false
      this.July = false
      this.Aug = false
      this.sept = false
      this.Oct = true
      this.Nov = true
      this.Dec = true
    } else if (val == 4) {
      this.showtable1 = true
      this.showtable = false
      this.Jan = true
      this.Feb = true
      this.March = true
      this.Apr = false
      this.May = false
      this.June = false
      this.July = false
      this.Aug = false
      this.sept = false
      this.Oct = false
      this.Nov = false
      this.Dec = false
    }
  }

  back() {
    this.showtable1 = false
    this.showtable = true
  }
}




