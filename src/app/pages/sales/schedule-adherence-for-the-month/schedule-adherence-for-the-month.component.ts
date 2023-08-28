
import { Component, ViewChild } from '@angular/core';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from '../../../../environments/environment';
import { NgSelectComponent } from "@ng-select/ng-select";
import * as  moment from 'moment';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { scheduleadherenceservice } from './scheduleadherence.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AppComponentService } from 'src/app/app-component.service';

@Component({
  selector: 'app-schedule-adherence-for-the-month',
  templateUrl: './schedule-adherence-for-the-month.component.html',
  styleUrls: ['./schedule-adherence-for-the-month.component.scss']
})
export class ScheduleAdherenceForTheMonthComponent {
  branch = []

  selectedBrach;
  selectedYear;
  selectedMonth;
  angForm: FormGroup;
  showBranch: boolean = true

  constructor(
    private _AppComponentService: AppComponentService,
    private _scheduleadherenceservice: scheduleadherenceservice,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }


  createForm() {
    this.angForm = this.fb.group({

      BRANCH_NAME: ["", Validators.required],
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
    this._AppComponentService.branchList().subscribe((res) => {
      console.log(res.List)
      if (res.List.length > 1) {
        this.showBranch = true;
        let obj = {
          ADDRESS1: "",
          ADDRESS2: null,
          CITY_NAME: "",
          CODE: "100",
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
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
    const table = document.querySelector('smart-table');
  }

  init(): void {
    // init code.
    const table = this.table;

    table.addGroup('CREDIT_DAYS');
  }

  handleClick(event: Event, type: String) {
    this.table.exportData(type, 'table');
  }
  loadData() {
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);

    const formVal = this.angForm.value;
    let objdata = {

      BRANCH_NAME: this.selectedBrach,
      YEAR_NAME: this.selectedYear,
      MONTH_NAME: this.selectedMonth
    }
    if (this.angForm.valid) {
      this._scheduleadherenceservice.findAll(objdata).subscribe((newdata) => {

      }, err => {
        Swal.fire('Warning', err, 'info')
      })
    } else {

      Swal.fire('Warning', 'Please fill from and to date', 'info')
    }


  }

}


