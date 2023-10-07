import { Component, ViewChild, OnInit,ElementRef,Renderer2 } from '@angular/core';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import * as  moment from 'moment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgSelectComponent } from "@ng-select/ng-select";
import { CommonModule } from '@angular/common';
import { CustomerService } from './customer.service';
import { AppComponentService } from 'src/app/app-component.service';
@Component({
  selector: 'app-customer-receivable-chart',
  templateUrl: './customer-receivable-chart.component.html',
  styleUrls: ['./customer-receivable-chart.component.scss']
})
export class CustomerReceivableChartComponent  implements OnInit{
  @ViewChild('fdateInput') fdateInput: ElementRef;
  @ViewChild('FROM', { static: false }) FROM: NgSelectComponent;
  maxDate: Date;
  maxDatet: Date;
  minDate: Date;
  minDatet: Date;
  fromdate = null
  todate = null
  branch = [];
  selectedBrach;
  showBranch: boolean = true;
  showtable: boolean = false;
  BRANCH: boolean = false;

  angForm: FormGroup;
  isLoading1: boolean = false;
  isLoading :boolean=false;
  

  constructor(
    private _CustomerService: CustomerService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() );
    this.maxDate.setDate(this.maxDate.getDate() - 7);
    this.fromdate = this.maxDate
    this.todate = this.minDate
  }
  onFocus(ele: NgSelectComponent) {
    ele.open();
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
      BRANCH_NAME: [""],

      FROM: ["", [Validators.required]], // control name
      TO: ["", [Validators.required]],


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
        url: environment.base_url + '/customerreceivablechart/customerreceivablechartData',
        dataSourceType: 'json',
        data: sqlQuery
      }, (response: any) => {
        resultCallbackFunction({
          dataSource: response.List,
          virtualDataSourceLength: 10
        });
      });
    },
    // dataFields: [
    //   'SUBGL_LONGNAME: string',
    //   'INVOICE_AMT: number',
    //   'CR_DAYS: number',
    //   'CREDIT_DAYS: number',
    //   'SUB_GLACNO: number',
    // ]
  });
  filtering = true;
  filterRow = true;
  sortMode = 'one';
  paging = true;
  columnSizeMode = 'default';
  columns = [
    {
      label: 'Bill Date', dataField: 'BILL_DATE', formatFunction(settings: any) {
      },
    },
    { label: 'Bill No', dataField: 'BILL_NO' },
    { label: 'Material Name', dataField: 'CR_DAYS' },
    { label: 'Bill Qty.', dataField: 'BILL_QTY' },
    { label: 'Bill Amount', dataField: 'BILL_AMOUNT' },
    { label: 'Cumm. Bill', dataField: 'CUMM_BILL' },
    { label: 'GRN No.', dataField: 'GIR_NO' },
    { label: 'GRN Date', dataField: 'GIR_DATE' },
    { label: 'GRN Qty.', dataField: 'GIR_QTY' },
    { label: 'Due Date', dataField: 'DUE_DATE' },
    { label: 'Delay Days', dataField: 'DELAY_DAYS' },
    { label: 'Diff. Days', dataField: 'DIFF_DAYS' },
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
        this.branch = res.List;
        this.isLoading1 = false

      } else {
        this.BRANCH = false
        this.showBranch = false;
        this.branch = res.List;
        this.isLoading1 = false
        this.selectedBrach = this.branch[0]['CODE']
      }
      setTimeout(() => {
        this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
      }, 100);
    });
    
  }

  ngAfterViewInit(): void {

    // afterViewInit code.
    this.init();
    const table = document.querySelector('smart-table');
    this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
  }

  init(): void {
    // init code.
    const table = this.table;

    // table.addGroup('CUSTOMER_NAME');
  }

  handleClick(event: Event, type: String) {
    this.table.exportData(type, 'table');
  }
  loadData() {
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);


    const formVal = this.angForm.value;
    let objdata = {
      FROM: moment(this.fromdate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      TO: moment(this.todate, 'YYYY-MM-DD').format('YYYY-MM-DD'),

      BRANCH_NAME: this.selectedBrach


    }
    if (this.angForm.valid) {
      this.showtable = true

      this.dataSource = new window.Smart.DataAdapter({
        virtualDataSource: function (resultCallbackFunction: any, details: any) {
          const sqlQuery = details;
          const queryData = details.query;

          sqlQuery.query = JSON.stringify(queryData);
          // this.http.post('http://localhost:3000',details).subscribe((data: any)=>{
          //   console.log(data)
          // })
          new window.Smart.Ajax({
            // type:'post',
            url: environment.base_url + '/customerreceivablechart/customerreceivablechartData',
            dataSourceType: 'json',
            data: sqlQuery
          }, (response: any) => {
            resultCallbackFunction({
              dataSource: response.List,
              virtualDataSourceLength: 10
            });
          });
        },
        // dataFields: [
        //   'SUBGL_LONGNAME: string',
        //   'INVOICE_AMT: number',
        //   'CR_DAYS: number',
        //   'CREDIT_DAYS: number',
        //   'SUB_GLACNO: number',
        // ]
      });

      // this._CustomerService.findAll(objdata).subscribe((newdata) => {

      // }, err => {
      //   Swal.fire('Warning', err, 'info')
      // })
    } else {


      Swal.fire('Warning', 'Please fill from and to date', 'info')
    }


  }

}


