import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { AuthenticationService, TokenPayload } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials: TokenPayload = {
    id: 0,
    name: '',
    phone: 0,
    email: '',
    password: '',
  }

  public form: FormGroup;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router,
    private auth: AuthenticationService) {
    
    this.settings = this.appSettings.settings;

    this.form = this.fb.group({
      'id': [0],
      'first_name': [''],
      'last_name': [''],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'rememberMe': false
    });
  }

  // public onSubmit(values: Object): void {
  //   if (this.form.valid) {
  //     this.router.navigate(['/']);
  //   }
  // }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  login() {
    this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigateByUrl('/')
      },
      err => {
        console.error(err)
      }
    )
  }
}
