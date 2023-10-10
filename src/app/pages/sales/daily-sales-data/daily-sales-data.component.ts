import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
import { DailySalesService } from './daily-sales-data.service';
import { AppComponentService } from 'src/app/app-component.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-daily-sales-data',
  templateUrl: './daily-sales-data.component.html',
  styleUrls: ['./daily-sales-data.component.scss']
})
export class DailySalesDataComponent implements OnInit {
  @ViewChild('fdateInput') fdateInput: ElementRef;
  @ViewChild('FROM', { static: false }) FROM: NgSelectComponent;
  // dataSource = []



  freezeHeader: boolean = true;

  angForm: FormGroup;
  branch = [];
  maxDate: Date;
  maxDatet: Date;
  minDate: Date;
  minDatet: Date;
  fromdate = null
  //todate = null
  selectedBrach;
  showBranch: boolean = true;
  showtable: boolean = false;
  showtable1: boolean = false;
  isLoading1: boolean = false;
  BRANCH: boolean = false;
  isLoading = false;
  //FROM: FormControl;
  Tabledata = []
  Tabledata1 = []
  todate
  cdate
  pdate

  // tableColumns = ['Customer Name', 'Target Sales Amount','Target Sales Avg/Day','Sale Up to','Todays Sales',' Total Sales',' Remaining Sales','Current Avg/Day(1)','Required Avg/Day(26)']; 
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
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _dailysalesService: DailySalesService,
    private renderer: Renderer2,

  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate());
    // this.minDatet.setDate(this.maxDate.getDate() + 1);
    this.fromdate = this.maxDate
    this.todate = this.minDate
  }
  createForm() {
    this.angForm = this.fb.group({
      FROM: ["", [Validators.required]], // control name
      BRANCH_NAME: [""],
      Customer_Select_Option: ["0"],
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
        this.selectedBrach = this.branch[0]['CODE']
      } else {
        this.BRANCH = false;
        this.showBranch = false;
        this.branch = res.List;
        this.isLoading1 = false;
        this.selectedBrach = this.branch[0]['CODE']
      }
      setTimeout(() => {
        this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
      }, 100)
    });
  }
  
  onFocus(ele: NgSelectComponent) {
    ele.open();
  }
  onValueChange(value: Date): void {
    this.maxDatet = new Date();

    this.maxDatet.setDate(this.maxDatet.getDate());
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

    //}

  }
  // Tabledata= []
  // FooterData=[]
  loadData() {
    this.isLoading = true;

    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    const formVal = this.angForm.value;
    let newdata = ''
    let filteredUsers = this.Tabledata.filter((user) => {
      return user.checked == true;
    });
    if (formVal.Customer_Select_Option != 0) {
      for (let i = 0; i <= filteredUsers.length - 1; i++) {
        newdata = newdata + filteredUsers[i].CODE
      }

    } else {
      newdata = '0'
      filteredUsers.push(newdata)
    }
    if (filteredUsers.length != 0) {
      let objdata = {
        SP_NAME: 'Sel_DBDailySales',
        PARAM: result.COMPANY_ID + ',' + this.selectedBrach + ',' + newdata + ',' + moment(this.fromdate, 'YYYY-MM-DD').format('YYYYMMDD'),




        // FROM: moment(this.fromdate, 'YYYY-MM-DD').format('YYYYMMDD'),
        // SUPPLIER: newdata,
        // BRANCH_NAME: this.selectedBrach,
        // CODE: result.COMPANY_ID
      }
      if (this.angForm.valid) {

        this._AppComponentService.findAll(objdata).subscribe((res) => {
          this.showtable = false
          this.showtable1 = true

          this.Tabledata1 = res.List
          this.tempdata = res.List
          this.isLoading = false;
        });

      } else {
        this.isLoading = false;

        Swal.fire('Warning', 'Please fill All Fields', 'info')
      }
    } else {
      Swal.fire('Warning', 'Please Select Customer', 'info')
    }

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
    // dataFields: [
    //   'SUBGL_LONGNAME: string',
    //   'INVOICE_AMT: number',
    //   'CR_DAYS: number',
    //   'CREDIT_DAYS: number',
    //   'SUB_GLACNO: number',

    //]
  });
  filtering = true;
  filterRow = true;
  sortMode = 'one';
  paging = true;
  columnSizeMode = 'default';
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

Keyarray=[];
tempdata=[];
searchQuery: string = '';
 

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
    const table = document.querySelector('smart-table');
    this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();

  }
  filterData() {
    const searchQueryLowerCase = this.searchQuery.toLowerCase().trim();
    this.Tabledata1 = this.tempdata.filter(item => {
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

    //table.addGroup('CREDIT_DAYS');
  }

  handleClick(event: Event, type: String) {
    this.table.exportData(type, 'table');
  }

  check(val) {


    this.cdate = moment(this.fromdate, 'YYYY-MM-DD').format('DD/MM/YYYY')
    this.pdate = moment(this.todate, 'YYYY-MM-DD').format('DD/MM/YYYY')
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    let objdata = {
      CODE: result.COMPANY_ID
    }
    if (val == '0') {
      this.showtable = false
      this.showtable1 = false

    } else {
      this._AppComponentService.customerList(objdata).subscribe((res) => {
        this.showtable = true
        this.showtable1 = false
        this.Tabledata = res.List
        for (let i = 0; i < this.Tabledata.length - 1; i++) {
          this.Tabledata[i]['checked'] = false
        }
      });

    }
  }

}



