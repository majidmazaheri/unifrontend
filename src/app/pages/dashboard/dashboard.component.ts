import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Device } from 'src/app/shared/device-model/device.model';
import { AppSettings } from 'src/app/app.settings';
import { AuthenticationService } from 'src/app/authentication.service';
import { Settings } from 'src/app/app.settings.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  public settings: Settings;
  details: Device;

  public colorScheme = {
    domain: ['rgba(255,255,255,0.8)']
  };
  public autoScale = true;
  constructor(
    private auth: AuthenticationService,
    public appSettings: AppSettings) {
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
}
