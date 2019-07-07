import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { User } from '../user.model';
import { passDontMatch, newPassConfirm, oldPassConfirm } from './custom-validators';
import { Device } from 'src/app/shared/device-model/device.model';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public Password: { id: number, password: string };
  public profileForm: FormGroup;
  public passwordForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    public auth: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public details: User,
    public fb: FormBuilder) {
    this.profileForm = this.fb.group({
      id: this.details.id,
      name: this.details.name,
      email: this.details.email,
      phone: this.details.phone,
      password: this.details.password,
    })
    

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPasswordRepeat: ['', Validators.compose([Validators.required])]
    });
  }

  static newPassConfirm(control: AbstractControl) {
    const newPassword: string = control.get('newPassword').value; // get password from our password form control
    const newPasswordRepeat: string = control.get('newPasswordRepeat').value; // get password from our confirmPassword form control
    // compare is the password math
    if (newPassword !== newPasswordRepeat) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('newPasswordRepeat').setErrors({ newMismatch: true });
    }
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
    this.profileForm.patchValue(this.details);
  }

  passwordEdit(id, password): void {
    this.Password = { id, password }
    this.dialogRef.close(this.Password);
  }

  profileEdit(profile: User): void {
    this.dialogRef.close(profile);
  }

  close(): void {
    this.dialogRef.close();
  }

  profileSubmit() {
    this.auth.profileEdit(this.profileForm.value)
  }
}
