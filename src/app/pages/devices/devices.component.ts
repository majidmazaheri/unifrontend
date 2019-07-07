import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Device } from '../../shared/device-model/device.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from "@angular/router";
import { DeviceDialogComponent } from './deivce-dialog/device-dialog.component';
import { MatDialog } from '@angular/material';
import { User } from '../profile/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  public settings: Settings;
  public form: FormGroup;
  details: Device;
  public deviceEdit: Device;
  deviceAdd: Device;
  public profile: User;

  public colorScheme = {
    domain: ['rgba(255,255,255,0.8)']
  };
  public autoScale = true;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    public appSettings: AppSettings,
    private router: Router,
    public dialog: MatDialog) {
    this.form = this.fb.group({
      fk_id: [''],
      d_id: [''],
      password: [''],
      d_name: [''],
      p_name: [''],
      e_s_moisture: [''],
      e_light: [''],
      e_a_moisture: [''],
      e_temp: [''],
      watering_mode: [''],
    });
  }

  ngOnInit() {
    this.auth.status().subscribe(
      device => {
        this.details = device
      },
      err => {
        console.error(err)
      }
    )
  }

  Dialog(device: Device): void {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      data: { device: device }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.deviceEdit = result;
      this.submit(this.deviceEdit);
      }
    });
  }

  addDialog(): void {
    // this.form.patchValue(this.details[0].d_id)
    // this.form.value.fk_id = this.profile.id;
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      data: { device: this.form.value }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.deviceEdit = result;
      this.submit(this.deviceEdit);
    });
  }

  remove(Device) {
    this.auth.remove(Device).subscribe(
      () => {
        this.router.navigateByUrl("/devices");
      },
      err => {
        console.error(err);
      }
    );
  }

  submit(deviceEdit: Device) {
    this.auth.submit(deviceEdit).subscribe(
      () => {
        this.router.navigateByUrl("/devices");
      },
      err => {
        console.error(err);
      }
    );
  }
}
