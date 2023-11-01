import { Component, ElementRef, ViewChild,OnInit,Renderer2 } from '@angular/core';

import { SupplierWiseBoringService } from './supplier-wise-boring.service';
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
  selector: 'app-supplier-wise-boring-recovery-details',
  templateUrl: './supplier-wise-boring-recovery-details.component.html',
  styleUrls: ['./supplier-wise-boring-recovery-details.component.scss']
})
export class SupplierWiseBoringRecoveryDetailsComponent {
  filterValues: string[] = new Array(Headers.length).fill('');
  columnOptions: any[] = []; 
  showColumnDropdown: boolean = true;
  @ViewChild('YEAR_NAME', { static: false }) YEAR_NAME: NgSelectComponent;
  @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  filterInputValue = '';
  selectedColumn:any;
  @ViewChild('FROM', { static: false })FROM: NgSelectComponent;
 
  @ViewChild('fdateInput') fdateInput: ElementRef;
  dataSource = []
  freezeHeader: boolean = true;

  angForm: FormGroup;
  Keyarray = [];
  branch = [];
  Tabledata = [];
  selectedDate: Date;
  previousDate: Date;
  previousMonth: Date;
  previousMonthDate: string;
  showBranch: boolean = true
  showtable: boolean = false
  isLoading1: boolean = false;
  isLoading: boolean = false;
  BRANCH: boolean = false;
  maxDate: Date;
  maxDatet: Date;
  minDate: Date;
  minDatet: Date;
  fromdate = null
  // todate = null
  selectedBrach
  searchQuery: string = '';


  // tableColumns = ['SN', 'Party Name','Balance Boring of','Boring Genretion as per GRN ','Total collection plan as per GRN','Actual Collection','Balance','Supplier PHONE NO']; 
  isFilterOpen: { [key: string]: boolean } = {};
  isFilterInputOpen: { [key: string]: boolean } = {};
column: any;
values: any;
currentOpenFilter: string | null = null;
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


  constructor(
    private _SupplierWiseBoringService: SupplierWiseBoringService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2,
    
  ) {

    this.selectedDate = new Date();
    this.upmonth();
    let dt = new Date()
    this.minDate = new Date();
    this.maxDate = new Date(dt.getFullYear(), dt.getMonth(), 1);
    this.minDatet = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());
    this.minDatet.setDate(this.maxDate.getDate() + 1);
    this.fromdate = this.maxDate
    // this.todate = this.minDate

  }

  ngAfterViewInit(): void {
    // afterViewInit code.

    this.renderer.selectRootElement(this.fdateInput.nativeElement).focus();
  }
  init() {
    // throw new Error('Method not implemented.');
  }
  

  filterData() {
    const searchQuery = this.searchQuery.trim().toLowerCase(); // Convert search query to lowercase
  
    this.Tabledata = this.tempdata.filter(item => {
      const values = Object.values(item);
      return values.some(value => {
        if (typeof value === 'string') {
          const lowerCaseValue = value.toLowerCase(); // Convert value to lowercase
          return lowerCaseValue.includes(searchQuery);
        } else if (typeof value === 'number') {
          const valueAsString = value.toString();
          return valueAsString.includes(searchQuery);
        }
        return false;
      });
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

    // }

  }
  createForm() {
    this.angForm = this.fb.group({
      FROM: ["", [Validators.required]], // control name

      BRANCH_NAME: [""],



    });
  }

  ngOnInit() {
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
      }, 100);
    });
  }
  tempdata = []
  loadData() {
    this.isLoading = true;
    this.Tabledata = []
    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);

    const formVal = this.angForm.value;
    let objdata = {
      FROM: moment(this.fromdate, 'YYYY-MM-DD').format('YYYYMMDD'),
      // TO: moment(this.todate, 'YYYY-MM-DD').format('YYYYMMDD'),
      BRANCH_NAME: this.selectedBrach,
      CODE: result.COMPANY_ID

    }

    if (this.angForm.valid) {
      this._SupplierWiseBoringService.findAll(objdata).subscribe((res) => {
        let obj = {}

        this.showtable = true
        this.Tabledata = res.List
        this.tempdata = res.List
        
        this.isLoading = false;

      });
    } else {
      this.isLoading = false;
      Swal.fire('Warning', 'Please fill All Details Properly', 'info')
    }


  }

  updatePreviousDate() {
    if (this.selectedDate) {
      this.previousDate = new Date(this.selectedDate);
      this.previousDate.setDate(this.selectedDate.getDate() - 1);
    } else {
      this.previousDate = null;
    }
  }
  upmonth() {
    if (this.selectedDate) {
      const selectedMoment = moment(this.selectedDate);
      this.previousMonthDate = selectedMoment.subtract(1, 'months').format('YYYY-MM-DD');
    } else {
      this.previousMonthDate = null;
    }
  }

}



