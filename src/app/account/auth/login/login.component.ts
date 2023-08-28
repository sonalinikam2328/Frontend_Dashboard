import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { LoginService } from './login.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  passType: string = 'password';

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService, private _LoginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: [''],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // this.router.navigateByUrl('/dashboard');

    const formVal = this.loginForm.value;
    let datatosend = {
      UserId: formVal.email,
      Password: formVal.password,
      CompanyID: 101,
    }
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {

      this._LoginService.loginData(datatosend)
        .pipe(first())
        .subscribe(
          response => {
            if (response.DataSet['diffgr:diffgram']['NewDataSet'] == undefined) {
              Swal.fire('Error', 'Invalid User Name', 'error')
            } else {
              if (response.DataSet['diffgr:diffgram']['NewDataSet']['Table']['IS_VALID'] == "True") {
                this._LoginService.loginData1(datatosend).subscribe(res => {
                  localStorage.setItem('user', JSON.stringify(res.List[0]));
                  this.router.navigate(['/account/companyList']);
                  // this.router.navigateByUrl('/dashboard');
                });
              } else {
                Swal.fire('Error', 'Invalid Password', 'error')

              }
            }
          },
          error => {
            this.error = error ? error : '';
          });

    }
  }

  showHidePassword() {

    if (this.passType == 'password') {
      this.passType = 'text';
    }
    else {
      this.passType = 'password';
    }
  }

}
