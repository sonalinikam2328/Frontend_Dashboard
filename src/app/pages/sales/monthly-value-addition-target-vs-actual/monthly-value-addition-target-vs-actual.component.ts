
import { Component, ViewChild, OnInit } from '@angular/core';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from '../../../../environments/environment';
import { NgSelectComponent } from "@ng-select/ng-select";
import * as  moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { monthlayvalueadditionservice } from './monthlayvalueaddition.service';
import { AppComponentService } from 'src/app/app-component.service';
@Component({
  selector: 'app-monthly-value-addition-target-vs-actual',
  templateUrl: './monthly-value-addition-target-vs-actual.component.html',
  styleUrls: ['./monthly-value-addition-target-vs-actual.component.scss']
})
export class MonthlyValueAdditionTargetVsActualComponent {
  branch = [];
  @ViewChild('YEAR_NAME', { static: false }) YEAR_NAME: NgSelectComponent;
  finyear = [];
  selectedBrach;
  selectedYear;
  angForm: FormGroup;
  showBranch: boolean = true
  showtable: boolean = false
  isLoading1: boolean = false;
  isLoading: boolean = false;
  BRANCH: boolean = false;
  Tabledata = [];
  searchQuery: string = '';
  Keyarray = [];
  
  isFilterOpen: { [key: string]: boolean } = {};
  isFilterInputOpen: { [key: string]: boolean } = {};
  data: any;
  column: any;
  currentOpenFilter: string | null = null;
  renderer: any;
  fdateInput: any;
  toggleFilter(column: string) {
    if (this.currentOpenFilter !== column) {
      // Close the previously open filter
      if (this.currentOpenFilter) {
        this.isFilterOpen[this.currentOpenFilter] = false;
        this.isFilterInputOpen[this.currentOpenFilter] = false;
      }

      this.currentOpenFilter = column;
    }

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
    private _monthlayvalueadditionservice: monthlayvalueadditionservice,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }


  onFocus(ele: NgSelectComponent) {
    ele.open();
    ele.close();
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
        this.isLoading1 = false
        this.selectedBrach = this.branch[0]['CODE']

      } else {
        this.BRANCH = false;
        this.showBranch = false;
        this.branch = res.List;
        this.isLoading1 = false;
        this.selectedBrach = this.branch[0]['CODE']
      }
    });

    this._AppComponentService.financialYear(obj).subscribe((res) => {
      this.finyear = res.List
      this.selectedYear = this.finyear[0]['DATEVALUE']

    });
  }
  ngAfterViewInit(): void {
    // afterViewInit code
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
  }

  init(): void {
    // init code.
    const table = this.table;

    // table.addGroup('CREDIT_DAYS');
  }

  handleClick(event: Event, type: String) {
    this.table.exportData(type, 'table');
  }
  Headers = [];

  temparr = [];
  labels
  datasets
  options
  arrdata
  arrdata1
  arrdata2

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

      this._monthlayvalueadditionservice.findAll(objdata).subscribe((res) => {
        let arr = []
        this.arrdata = []
        this.arrdata1 = []
        this.arrdata2 = []
        this.showtable = true
        if (res.List.length != 0) {
          this.Headers = res.Headers
          let tempHeaders = res.Headers
          for (let i = 0; i <= res.Headers.length - 1; i++) {

            const propertyValues = Object.values(res.Headers[i]);
            arr.push(propertyValues)
          }

          arr.pop()
          arr.pop()
          arr.splice(0, 1)[0]
          arr.splice(0, 1)[0]

          for (let i = 0; i <= res.List.length - 1; i++) {
            const propertyValues = Object.values(res.List[i]);
            this.Keyarray.push(propertyValues)
            this.temparr.push(propertyValues)
          }


          this.arrdata = (this.temparr[this.temparr.length - 4])
          this.arrdata1 = (this.temparr[this.temparr.length - 2])

          this.arrdata2 = (this.temparr[this.temparr.length - 1])

          let name = this.arrdata[1]

          this.arrdata = this.arrdata.slice(4);
          this.arrdata = this.arrdata.slice(0, -2);

          let name2 = this.arrdata1[1]
          this.arrdata1 = this.arrdata1.slice(4);
          this.arrdata1 = this.arrdata1.slice(0, -2);

          let name3 = this.arrdata2[1]
          this.arrdata2 = this.arrdata2.slice(4);
          this.arrdata2 = this.arrdata2.slice(0, -2);

          this.Tabledata = this.Keyarray
          this.isLoading = false;

          this.labels = arr
          this.datasets = [
            {
              label: name,
              fill: true,
              lineTension: 0.5,
              // backgroundColor: 'rgba(85, 110, 230, 0.2)',
              borderColor: '#556ee6',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: '#556ee6',
              // pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              // pointHoverBackgroundColor: '#556ee6',
              pointHoverBorderColor: '#fff',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.arrdata
            },
            {
              label: name2,
              fill: true,
              lineTension: 0.5,
              // backgroundColor: 'rgba(235, 239, 242, 0.2)',
              borderColor: '#34c38f',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: '#34c38f',
              // pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              // pointHoverBackgroundColor: '#34c38f',
              pointHoverBorderColor: '#000',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.arrdata1
            },
            {
              label: name3,
              fill: true,
              lineTension: 0.5,
              // backgroundColor: 'rgba(52, 195, 143, 0.8)',
              borderColor: '#ebeff2',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: '#ebeff2',
              // pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              // pointHoverBackgroundColor: '#ebeff2',
              pointHoverBorderColor: '#eef0f2',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.arrdata2
            }
          ]
          this.options = {
            defaultFontColor: '#8791af',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'rgba(166, 176, 207, 0.1)',
                  },
                },
              ],
              yAxes: [
                {
                  //   ticks: {
                  //     max: 100,
                  //     min: 20,
                  //     stepSize: 10,
                  //   },
                  gridLines: {
                    color: 'rgba(166, 176, 207, 0.1)',
                  },
                },
              ],
            },

          }
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
