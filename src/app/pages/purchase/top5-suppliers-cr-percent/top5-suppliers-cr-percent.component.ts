import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import * as  moment from 'moment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgSelectComponent } from "@ng-select/ng-select";
import { Top5Service } from './top5.service';
import { AppComponentService } from 'src/app/app-component.service';
import { tableData } from '../../tables/advancedtable/data';

@Component({
  selector: 'app-top5-suppliers-cr-percent',
  templateUrl: './top5-suppliers-cr-percent.component.html',
  styleUrls: ['./top5-suppliers-cr-percent.component.scss']
})
export class Top5SuppliersCRPercentComponent implements OnInit, AfterViewInit {
  @ViewChild('FROM', { static: false }) FROM: NgSelectComponent;
  @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  Keyarray = [];
  searchQuery: string = '';

  @ViewChild('fdateInput') fdateInput: ElementRef;
  branch = [];
  finyear = [];
  Headers = [];
  Tabledata = [];
  selectedBrach;
  selectedYear;
  maxDate: Date;
  maxDatet: Date;
  minDate: Date;
  minDatet: Date;
  fromdate = null
  todate = null
  angForm: FormGroup;
  showBranch: boolean = false
  grouping: boolean = true;
  keyboardNavigation: boolean = true;
  showtable: boolean = false;
  BRANCH: boolean = false;
  dataSource
  filtering = true;
  filterRow = true;
  sortMode = 'one';
  paging = true;
  columnSizeMode = 'default';
  columns
  isLoading1: boolean = false;
  isLoading = false;
  TOTAL_RECEIPT_QTY
  TOTAL_CR_QTY
  TOTAL_RECEIPT_WT
  TOTAL_CR_WT
  TOTAL_CR_PERCENT
  
  // tableColumns = ['Sr.No.', 'Supplier Name','Receipt Qty','CR Qty','Receipt Tonnage','CR Tonnage',
  // 'CR % On Tonnage','Rejection Details']; 
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
    //console.log(`Filter applied for ${column} with option: ${filterOption}`);
  }

  toggleFilterInput(column: string) {
    this.isFilterInputOpen[column] = !this.isFilterInputOpen[column];
  }


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _AppComponentService: AppComponentService,
    private _Top5Service: Top5Service,
    private renderer: Renderer2,
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDatet = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
    this.minDatet.setDate(this.maxDate.getDate() + 1);
    this.fromdate = this.maxDate
    this.todate = this.minDatet
  }
  createForm() {
    this.angForm = this.fb.group({
      FROM: ["", [Validators.required]], // control name
      TO: ["", [Validators.required]],
      BRANCH_NAME: [""],
    });

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
      setTimeout(() => {
        this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
      }, 100);
    });

  }

  onFocus(ele: NgSelectComponent) {
    ele.open();
  }
  // onValueChange(value: Date): void {
  //   this.maxDatet = new Date();

  //   // this.maxDatet.setDate(this.maxDatet.getDate());
  //   // if (this.fromdate != null && this.todate != null) {

  //   //   let from = this.fromdate.getFullYear() + '/' + (this.fromdate.getMonth() + 1) + '/' + this.fromdate.getDate()
  //   //   let to = this.todate.getFullYear() + '/' + (this.todate.getMonth() + 1) + '/' + this.todate.getDate()

  //   //   if (from == to) {
  //   //     Swal.fire('Error', 'From date and To date not be equal', 'error');
  //   //     this.angForm.controls['TO'].reset()
  //   //   }

  //   //   if (from > to) {
  //   //     Swal.fire('Error', 'To date is must be less than From date', 'error');
  //   //     this.angForm.controls['TO'].reset()
  //   //   }

  //   // }

  // }
  temPTable = []
  loadData() {
    this.isLoading = true;

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

      this._Top5Service.findAll(objdata).subscribe((res) => {
        this.showtable = true
        let obj = {}


        for (let i = 0; i <= res.List.length - 1; i++) {
          res.List[i]['RECEIPT_QTY'] = parseFloat(res.List[i]['RECEIPT_QTY']).toFixed(2)
          res.List[i]['CR_QTY'] = parseFloat(res.List[i]['CR_QTY']).toFixed(2)
          res.List[i]['RECEIPT_WT'] = parseFloat(res.List[i]['RECEIPT_WT']).toFixed(2)
          res.List[i]['CR_WT'] = parseFloat(res.List[i]['CR_WT']).toFixed(2)
          res.List[i]['CR_PERCENT'] = parseFloat(res.List[i]['CR_PERCENT']).toFixed(2)
        }
        this.Tabledata = res.List
        this.temPTable = this.Tabledata
        
        let first = this.Tabledata.reduce((accumulator, object) => {
          return Number(accumulator) + Number(object.RECEIPT_QTY);
        }, 0);
        this.TOTAL_RECEIPT_QTY = parseFloat(first).toFixed(2)

        let second = this.Tabledata.reduce((accumulator, object) => {
          return Number(accumulator) + Number(object.CR_QTY);
        }, 0);
        this.TOTAL_CR_QTY = parseFloat(second).toFixed(2)

        let third = this.Tabledata.reduce((accumulator, object) => {
          return Number(accumulator) + Number(object.RECEIPT_WT);
        }, 0);
        this.TOTAL_RECEIPT_WT = parseFloat(third).toFixed(2)

        let forth = this.Tabledata.reduce((accumulator, object) => {
          return Number(accumulator) + Number(object.CR_WT);
        }, 0);
        this.TOTAL_CR_WT = parseFloat(forth).toFixed(2)

        let fith = this.Tabledata.reduce((accumulator, object) => {
          return Number(accumulator) + Number(object.CR_PERCENT);
        }, 0);
        this.TOTAL_CR_PERCENT = parseFloat(fith).toFixed(2)

        // this.Tabledata.unshift(obj)
        // this.Tabledata.unshift(obj)
        this.isLoading = false;
      });

    } else {
      this.isLoading = false;

      Swal.fire('Warning', 'Please fill All Fields', 'info')
    }


  }


  // dataSource = new window.Smart.DataAdapter({
  //   virtualDataSource: function (resultCallbackFunction: any, details: any) {
  //     const sqlQuery = details;
  //     const queryData = details.query;

  //     sqlQuery.query = JSON.stringify(queryData);
  //     // this.http.post('http://localhost:3000',details).subscribe((data: any)=>{
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
  // filtering = true;
  // filterRow = true;
  // sortMode = 'one';
  // paging = true;
  // columnSizeMode = 'default';
  // columns = [
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
  ngAfterViewInit(): void {
    // afterViewInit code.
    const table = document.querySelector('smart-table');
    this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
  }

  filterData() {
    const searchQueryLowerCase = this.searchQuery.toLowerCase().trim();
    this.Tabledata = this.temPTable.filter(item => {
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
  }


  
  


  init(): void {
    // init code.
    const table = this.table;

  }

  handleClick(event: Event, type: String) {
    this.table.exportData(type, 'table');
  }




}
