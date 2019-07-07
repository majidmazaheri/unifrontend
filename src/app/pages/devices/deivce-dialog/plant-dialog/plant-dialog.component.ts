import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Plant } from './plant.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { Settings } from 'src/app/app.settings.model';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-plant-dialog',
  templateUrl: './plant-dialog.component.html',
  styleUrls: ['./plant-dialog.component.scss']
})
export class PlantDialogComponent implements OnInit {
  public plants: Plant;
  public searchText: string;
  public page: any;
  public settings: Settings;
  public showSearch: boolean = false;
  public viewType: string = 'grid';
  public form: FormGroup;
  constructor(public dialogRef: MatDialogRef<PlantDialogComponent>, public auth: AuthenticationService,
    public appSettings: AppSettings,
    @Inject(MAT_DIALOG_DATA) public plant: Plant,
    public fb: FormBuilder) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      p_id: '',
      p_name: [null, Validators.required],
      e_s_moisture: [null, Validators.required],
      e_light: [null, Validators.required],
      e_a_moisture: [null, Validators.required],
      e_temp: [null, Validators.required],
      watering_mode: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getPlants()
  }

  close(plant: Plant): void {
    this.dialogRef.close(plant);
  }

  getPlants() {
    this.auth.plants().subscribe(
      Plants => {
        this.plants = Plants
      },
      err => {
        console.error(err)
      }
    )
  }

public onPageChanged(event){
    this.page = event;
    this.getPlants();    
    document.getElementById('main').scrollTop = 0;
}

}
