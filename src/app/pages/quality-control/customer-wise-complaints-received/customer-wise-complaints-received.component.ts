import { Component, ViewChild } from '@angular/core';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from '../../../../environments/environment';
import { NgSelectComponent } from "@ng-select/ng-select";
import * as  moment from 'moment';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { QualityService } from './quality.service';
import { AppComponentService } from 'src/app/app-component.service';

@Component({
  selector: 'app-customer-wise-complaints-received',
  templateUrl: './customer-wise-complaints-received.component.html',
  styleUrls: ['./customer-wise-complaints-received.component.scss']
})
export class CustomerWiseComplaintsReceivedComponent {
  @ViewChild('YEAR_NAME', { static: false }) YEAR_NAME: NgSelectComponent;
  branch = []
  finyear = [];
  month = [];
  selectedBrach;
  selectedYear;
  selectedMonth;
  angForm: FormGroup;
  showBranch: boolean = true
  showtable: boolean = false;
  isLoading1: boolean = false;
  BRANCH: boolean = false;
  isLoading = false;

  constructor(
    private _AppComponentService: AppComponentService,
    private _QualityService: QualityService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }


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

    });
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
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
  Tabledata = []
  Headers = []

  loadData() {
    this.Tabledata = []
    this.isLoading = true;

    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    const formVal = this.angForm.value;

    let date;
    let result1 = this.selectedYear.substr(0, 4);
    let result2 = this.selectedYear.substr(4, 4);

    let result3 = this.selectedMonth.substr(0, 2);
    let result4 = this.selectedMonth.substr(2, 2);

    if (result3 > '03') {
      date = result2 + result3 + result4
    } else {
      date = result1 + result3 + result4
    }

    let objdata = {
      SP_NAME: 'Sel_DBCustwsComplaintsRecd',
      PARAM: result.COMPANY_ID + ',' + this.selectedBrach + ',' + date,
    }

    if (this.angForm.valid) {

      this._AppComponentService.findAll(objdata).subscribe((res) => {

        let obj = {}
        debugger
        if (res.List.length != 0) {
          this.Tabledata = res.List
        
          this.isLoading = false;
        } else {
          Swal.fire('Warning', 'No Data Found', 'info')
          this.isLoading = false;
        }



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


}
