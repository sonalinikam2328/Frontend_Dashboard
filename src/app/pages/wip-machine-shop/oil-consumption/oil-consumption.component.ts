import { Component, OnInit, } from '@angular/core';
import { ViewChild } from '@angular/core';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from '../../../../environments/environment';
import { NgSelectComponent } from '@ng-select/ng-select';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { OilConsumptionService } from './oil-consumption.service';
import { AppComponentService } from '../../../app-component.service';


@Component({
  selector: 'app-oil-consumption',
  templateUrl: './oil-consumption.component.html',
  styleUrls: ['./oil-consumption.component.scss']
})
export class OilConsumptionComponent implements OnInit {


  @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;

  branch = [];
  finyear = [];
  Headers = [];
  Tabledata = [];
  Keyarray = [];
  montharray = []
  selectedBrach;
  selectedYear;
  angForm: FormGroup;
  showBranch: boolean = false
  grouping: boolean = true;
  keyboardNavigation: boolean = true;
  showtable: boolean = false;
  isLoading1: boolean = false;
  BRANCH: boolean = false;
  isLoading = false;
  dataSource
  filtering = true;
  filterRow = true;
  sortMode = 'one';
  paging = true;
  columnSizeMode = 'default';
  columns

  constructor(

    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _AppComponentService: AppComponentService,
    private _OilConsumptionService: OilConsumptionService,
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.isLoading1 = true

    // onInit code.
    this._AppComponentService.branchList().subscribe((res) => {
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
    });

    this._AppComponentService.financialYear().subscribe((res) => {
      this.finyear = res.List
    });

  }

  onFocus(ele: NgSelectComponent) {
    ele.open();
  }

  createForm() {
    this.angForm = this.fb.group({
      BRANCH_NAME: [""],
      YEAR_NAME: ["", Validators.required],
    });
  }


  // dataSource = new window.Smart.DataAdapter({
  //   virtualDataSource: function (resultCallbackFunction: any, details: any) {
  //     debugger

  //     const sqlQuery = details;
  //     const queryData = details.query;

  //     sqlQuery.query = JSON.stringify(queryData);
  //     // this.http.post('http://localhost:3000',details).subscribe((data: any)=>{
  //     //   console.log(data)
  //     // })
  //     new window.Smart.Ajax({
  //       // type:'post',
  //       url: environment.base_url + '/companyList',
  //       dataSourceType: 'json',
  //       data: sqlQuery
  //     }, (response: any) => {
  //       resultCallbackFunction({
  //         dataSource: response.List,
  //         virtualDataSourceLength: 10
  //       });
  //     });
  //   },
  //   dataFields: [
  //     'SUBGL_LONGNAME: string',
  //     'INVOICE_AMT: number',
  //     'CR_DAYS: number',
  //     'CREDIT_DAYS: number',
  //     'SUB_GLACNO: number',

  //   ]
  // });


  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
    const table = document.querySelector('smart-table');
  }

  init(): void {
    // init code.
    const table = this.table;
  }

  handleClick(event: Event, type: String) {
    this.table.exportData(type, 'table');
  }

  loadData() {
    this.Tabledata = []
    this.Keyarray = []
    this.isLoading = true;

    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    let tempmonth = []
    const formVal = this.angForm.value;

    let objdata = {
      BRANCH_NAME: this.selectedBrach,
      FINANCIAL_YEAR: this.selectedYear,
      CODE: result.COMPANY_ID
    }

    if (this.angForm.valid) {

      this._OilConsumptionService.findAll(objdata).subscribe((res) => {

        this.showtable = true
        if (res.List.length != 0) {
          this.Headers = res.Headers
          let obj = { MAT_NAME: 'Month' }
          this.Headers.unshift(obj);
          for (let i = 0; i <= res.List.length - 1; i++) {
            const propertyValues = Object.values(res.List[i]);
            propertyValues.shift()
            // tempmonth.push(propertyValues[0])
            // propertyValues.shift()
            this.Keyarray.push(propertyValues)
          }
          // this.montharray = tempmonth
          this.Tabledata = this.Keyarray
          this.isLoading = false;

        } else {
          this.isLoading = false;
          Swal.fire('Warning', 'No Data Found', 'info')
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







