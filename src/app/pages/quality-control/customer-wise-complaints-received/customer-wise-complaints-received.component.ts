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
  filterValues: string[] = new Array(Headers.length).fill('');
  columnOptions: any[] = []; 
  showColumnDropdown: boolean = true;
  @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  filterInputValue = '';
  selectedColumn:any;
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
  Keyarray=[];
  searchQuery: string = '';
  renderer: any;
  fdateInput: any;

  isFilterOpen: { [key: string]: boolean } = {};
  isFilterInputOpen: { [key: string]: boolean } = {};
data: any;
column: any;
currentlyOpenInputBox: string | null = null;

  




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

  
  showFilterInput(event: MouseEvent) {
    const filterInput = (event.currentTarget as Element).querySelector('.filter-input');
    if (filterInput) {
        filterInput.classList.add('show');
    }
}

// Method to hide filter input
hideFilterInput(event: MouseEvent) {
    const filterInput = (event.currentTarget as Element).querySelector('.filter-input');
    if (filterInput) {
        filterInput.classList.remove('show');
    }
}
onFilterInputChange(value: string) {
 
}
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
  
      this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
    
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
    this.Headers = []
    this.Keyarray = []
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
    const endOfMonth = moment(date, 'YYYYMMDD').clone().endOf('month').format('YYYYMMDD');
    let objdata = {
      SP_NAME: 'Sel_DBCustwsComplaintsRecd',
      PARAM: `'${result.COMPANY_ID}', '${this.selectedBrach}' ,'${endOfMonth}'`,
    }

    if (this.angForm.valid) {

      this._AppComponentService.findAll(objdata).subscribe((res) => {

        let obj = {}
        // if (res.List.length != 0) {
        //   this.Tabledata = res.List

        //   this.isLoading = false;
        // } else {
        //   Swal.fire('Warning', 'No Data Found', 'info')
        //   this.isLoading = false;
        // }

        this.showtable = true

        if (res.List.recordsets.length != 0) {
          this.Headers = res.List.recordsets[1]
          // let obj = { MAT_NAME: 'Month' }
          // this.Headers.unshift(obj);
          for (let i = 0; i <= res.List.recordsets[0].length - 1; i++) {
            const propertyValues = Object.values(res.List.recordsets[0][i]);
            // propertyValues.shift()
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
