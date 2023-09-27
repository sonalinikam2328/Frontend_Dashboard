import { Component } from '@angular/core';
import { EnquiryRegisterService } from './enquiry-register.service';
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
  selector: 'app-enquiry-register',
  templateUrl: './enquiry-register.component.html',
  styleUrls: ['./enquiry-register.component.scss']
})
export class EnquiryRegisterComponent {
   // @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
   branch = []
   finyear = [];
   selectedBrach;
   selectedYear;
   selectedMonth;
   angForm: FormGroup;
   showBranch: boolean = true
   showtable: boolean = false;
   isLoading1: boolean = false;
   BRANCH: boolean = false;
   isLoading = false;
  private _EnquiryRegisterService: any;

   constructor(private _PaymentService: EnquiryRegisterService,
    private _AppComponentService: AppComponentService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,) { }

    reload()
    {
      window.location.reload();
    }

    createForm() {
      this.angForm = this.fb.group({
  
        BRANCH_NAME: [""],
        YEAR_NAME: ["", Validators.required],
        CUTOMER_TYPE: ["0", Validators.required],
        MONTH_NAME: ["",Validators.required],
        // MONTH_NAME: ["", Validators.required],
  
  
      });
    }
    onFocus(ele: NgSelectComponent) {
      ele.open();
    }
    ngOnInit(): void {
      // onInit code.
      this.isLoading1 = true
      this.createForm();
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
    }
  Tabledata = []
  FooterData = []
  loadData() {
    this.Tabledata = []
    this.FooterData = []
    this.isLoading = true;

    let data: any = localStorage.getItem('user');
    let result = JSON.parse(data);
    const formVal = this.angForm.value;
    // let objdata = [
    //   this.selectedBrach,
    //   this.selectedYear
    // ]
    let objdata = {
      BRANCH_NAME: this.selectedBrach,
      FINANCIAL_YEAR: this.selectedYear,
      CODE: result.COMPANY_ID,
      MONTH_NAME: this.selectedMonth,
     
    }
    
    if (this.angForm.valid) {

      this._EnquiryRegisterService.findAll(objdata).subscribe((res) => {
        debugger
        let obj = {}
        this.showtable = true
        this.FooterData.push(res.List[res.List.length - 1])
        this.Tabledata = res.List
        this.Tabledata.unshift(obj)
        this.Tabledata.pop()
        
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


    
  
      