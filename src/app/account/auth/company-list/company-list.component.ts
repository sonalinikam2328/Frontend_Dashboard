import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  // 
  tabledata = [];
  tempdata = [];

  constructor(
    private _LoginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnInit(): void {

    let data: any = localStorage.getItem("user");
    let result = JSON.parse(data);


    this._LoginService.companylist(result.USER_ID).subscribe(response => {

      this.tabledata = response.List;
    });

  }

  ngAfterViewInit(): void {

  }

  init(): void {

  }

  navigate(data) {
    localStorage.setItem('companyList', JSON.stringify(data));
    localStorage.setItem('Code', JSON.stringify(data.CODE));
    this.router.navigate(['/dashboard']);
  }



}
