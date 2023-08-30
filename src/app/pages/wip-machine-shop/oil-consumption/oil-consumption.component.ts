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
  selectedBrach;
  selectedYear;
  angForm: FormGroup;
  showBranch: boolean = false
  grouping: boolean = true;
  keyboardNavigation: boolean = true;
  showtable: boolean = false;
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

    // onInit code.
    this._AppComponentService.branchList().subscribe((res) => {
      if (res.List.length > 1) {
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
      } else {
        this.showBranch = false;
        this.branch = res.List
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
      BRANCH_NAME: ["", Validators.required],
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
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);

    const formVal = this.angForm.value;
    let objdata = {
      BRANCH_NAME: this.selectedBrach
    }
    if (this.angForm.valid) {

      this._OilConsumptionService.findAll().subscribe((res) => {
        this.showtable = true
        this.Headers = res.Headers
        let obj = { MAT_NAME: 'Month' }
        this.Headers.unshift(obj);
        this.Tabledata = res.List
      });

      // this.dataSource = new window.Smart.DataAdapter({
      //   virtualDataSource: function (resultCallbackFunction: any, details: any) {
      //     debugger

      //     const sqlQuery = details;
      //     const queryData = details.query;

      //     sqlQuery.query = JSON.stringify(queryData);

      //     new window.Smart.Ajax({
      //       // type:'post',
      //       url: environment.base_url + '/oilconsumption/getOilConsumptionData',
      //       dataSourceType: 'json',
      //       data: sqlQuery
      //     }, (response: any) => {
      //       resultCallbackFunction({
      //         dataSource: response.List,

      //         virtualDataSourceLength: 10
      //       });
      //     });
      //   },
      //   // dataFields: [
      //   //   'SUBGL_LONGNAME: string',
      //   //   'INVOICE_AMT: number',
      //   //   'CR_DAYS: number',
      //   //   'CREDIT_DAYS: number',
      //   //   'SUB_GLACNO: number',

      //   // ]
      // });
      // this.filtering = true;
      // this.filterRow = true;
      // this.sortMode = 'one';
      // this.paging = true;
      // this.columnSizeMode = 'default';
      // this.columns = [
      //   {
      //     label: 'SUBGL_LONGNAME', dataField: 'SUBGL_LONGNAME', formatFunction(settings: any) {
      //     },
      //   },
      //   { label: 'INVOICE_AMT', dataField: 'INVOICE_AMT' },
      //   { label: 'CR_DAYS', dataField: 'CR_DAYS' },
      //   { label: 'CREDIT_DAYS', dataField: 'CREDIT_DAYS' },

      //   {
      //     label: 'SUB_GLACNO', dataField: 'SUB_GLACNO', formatFunction(settings: any) {

      //     },
      //   },

      // ];
    } else {
      Swal.fire('Warning', 'Please fill from and to date', 'info')
    }


  }


}







