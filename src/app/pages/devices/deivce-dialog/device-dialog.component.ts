import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Device } from '../../../shared/device-model/device.model';
import { PlantDialogComponent } from './plant-dialog/plant-dialog.component';
import { Plant } from './plant-dialog/plant.model';
import { User } from '../../profile/user.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})
export class DeviceDialogComponent implements OnInit {
  public plant: Plant;
  public profile: User;
  public form: FormGroup;
  public security: FormGroup;
  public info: FormGroup;

  constructor( public dialog: MatDialog, public dialogRef: MatDialogRef<DeviceDialogComponent>, public auth: AuthenticationService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public device: Device,
    ) {
    this.security = this.fb.group({
      d_id: [this.device.d_id || null, Validators.required],
      password: [this.device.password || null, Validators.required]
    });
    this.info = this.fb.group({
      d_name: [this.device.d_name || null, Validators.required],
      p_name: [this.device.p_name || null, Validators.required],
      e_s_moisture: [this.device.s_moisture || null, Validators.required],
      e_light: [this.device.e_light || null, Validators.required],
      e_a_moisture: [this.device.a_moisture || null, Validators.required],
      e_temp: [this.device.e_temp || null, Validators.required, Validators],
      watering_mode: [this.device.watering_mode || null, Validators.required],
    });


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
    this.auth.profile().subscribe(
      user => {
        this.profile = user
      },
      err => {
        console.error(err)
      }
    )
  }

  confirm(security, info): void {

    this.form.patchValue(security);
    this.form.patchValue(info);
    this.form.value.fk_id = this.profile.id;
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  plantSelect(plant: Plant) {
    this.info.patchValue(plant);
  }

  Dialog(): void {
    const dialogRef = this.dialog.open(PlantDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.plant = result;
      this.plantSelect(this.plant)
    });
  }

}
