import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TurnOverService } from './turn-over.service';
import { TableComponent, TableColumn } from '@smart-webcomponents-angular/table';
import { environment } from '../../../../environments/environment';
import { NgSelectComponent } from "@ng-select/ng-select";
import * as  moment from 'moment';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AppComponentService } from 'src/app/app-component.service';


@Component({
  selector: 'app-turn-over',
  templateUrl: './turn-over.component.html',
  styleUrls: ['./turn-over.component.scss']
})
export class TurnOverComponent {
  @ViewChild('fdateInput') fdateInput: ElementRef;
  @ViewChild('YEAR_NAME', { static: false }) YEAR_NAME: NgSelectComponent;
  // @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  branch = []
  finyear = [];
  Keyarray = [];
  selectedBrach;
  selectedYear;
  selectedTYear;
  selectedMonth;
  angForm: FormGroup;
  showBranch: boolean = true
  showtable: boolean = false;
  isLoading1: boolean = false;
  BRANCH: boolean = false;
  isLoading = false;
  Loading: any;
  month = [];
  currentMonth
  priviousOne
  priviousTwo
  priviousThree
  priviousFour
  priviousFive
  MonthData
  searchQuery: string = '';
  // tableColumns = ['Sr. No.', 'Name of Customer','Payment Amount Plan For The Month Rs.','Amount Received Rs.','% of Recovery','Credit Day','Avg Payment Receipt Days','Avg Payment Receipt Days','Avg Payment Receipt Days','Avg Payment Receipt Days','Avg Payment Receipt Days','Avg Payment Receipt Days']; 
  isFilterOpen: { [key: string]: boolean } = {};
  isFilterInputOpen: { [key: string]: boolean } = {};
  column: any;
  values: any;
  currentOpenFilter: string | null = null;
  renderer: any;
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

  constructor(private _TurnOverService: TurnOverService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,) {
  }

  createForm() {
    this.angForm = this.fb.group({

      BRANCH_NAME: [""],
      YEAR_NAME: [""],
      TYEAR_NAME: [""],


    });
  }

  onFocus(ele: NgSelectComponent) {
    ele.open();
    ele.close();
  }
  ngAfterViewInit(): void {
    // afterViewInit code
    this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
  }
  init() {
    throw new Error('Method not implemented.');
  }
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
      this.selectedTYear = this.finyear[0]['DATEVALUE']
    });

  }
  filterData() {
    const searchQueryLowerCase = this.searchQuery.toLowerCase().trim();
    this.Tabledata = this.temparray.filter(item => {
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


  Tabledata = []
  FooterData = []
  temparray = []
  labels
  datasets
  options
  loadData() {
    this.Tabledata = []
    this.FooterData = []
    this.isLoading = true;
    let arr = []
    let arrdata = []
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    const formVal = this.angForm.value;

    let objdata = {
      SP_NAME: 'Sel_DBSalesYearlyTurnover',
      PARAM: `'${result.COMPANY_ID}', '${this.selectedBrach}' ,'${this.selectedYear}', '${this.selectedTYear}'`,
    }

    if (this.angForm.valid) {
      this._AppComponentService.findAll(objdata).subscribe((res) => {

        this.showtable = true
        for (let i = 0; i <= res.List.recordsets[0].length - 1; i++) {
          const propertyValues = Object.values(res.List.recordsets[0][i]);
          arr.push(propertyValues[0])
          arrdata.push(propertyValues[1])
          res.List.recordsets[0][i]['SALE_AMT'] = parseFloat(res.List.recordsets[0][i]['SALE_AMT']).toFixed(2)

        }

        this.Tabledata = res.List.recordsets[0]
        this.temparray = res.List.recordsets[0]

        this.labels = arr,
          this.datasets = [
            {
              label: 'Total Sale In Lacs',
              backgroundColor: 'rgba(52, 195, 143, 0.8)',
              borderColor: 'rgba(52, 195, 143, 0.8)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(52, 195, 143, 0.9)',
              hoverBorderColor: 'rgba(52, 195, 143, 0.9)',
              data: arrdata,
              barPercentage: 0.2

            },

          ]
        this.options = {
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(166, 176, 207, 0.1)'
                },
              }
            ],
            yAxes: [
              {
                gridLines: {
                  color: 'rgba(166, 176, 207, 0.1)'
                }
              }
            ]
          }
        }


        this.isLoading = false;
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
