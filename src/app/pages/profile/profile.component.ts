import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../authentication.service'
import { User } from './user.model';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { Router } from '@angular/router';
// import { resolveAny } from 'dns';
// import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class ProfileComponent implements OnInit {
  public details: User;
  public profile: User;
  public password: {id: number, password: string};
  public form: FormGroup;

  constructor(private auth: AuthenticationService, public dialog: MatDialog, private router: Router, public fb: FormBuilder) {
    this.form = this.fb.group({
      'name': [''],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'phone': [''],
      // 'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }
  public openUserDialog() {
    let dialogRef = this.dialog.open(UserDialogComponent, {
      data: this.details
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.name) {
      this.profile = result;
      this.profileEdit(this.profile);
    }
      if(result.id) {
      this.password = result;
      this.passwordEdit(this.password);
    }
    });
  }

  profileEdit(profile: User) {
    this.auth.profileEdit(profile).subscribe(
      () => {},
      err => {
        console.error(err);
      }
    );
  }

  passwordEdit(password) {
    this.auth.passwordEdit(password).subscribe(
      () => {},
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }
}