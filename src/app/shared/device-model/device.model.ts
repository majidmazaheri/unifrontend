import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Settings } from 'src/app/app.settings.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-device-model',
  templateUrl: './device.model.html',
  styleUrls: ['./device.model.scss']
})
export class DeviceModelComponent implements OnInit {
@Input() details: Device;
  public colorScheme = {
    domain: ['rgba(255,255,255,0.8)']
  };
  public autoScale = true;

  constructor(
    private auth: AuthenticationService,
    public appSettings: AppSettings) {
  }

  ngOnInit() {
  }


  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  public previousWidthOfResizedDiv: number = 0;
  public onSelect(event) {
    console.log(event);
  }
}

export class Device {
  public fk_id: number[];
  public password: string[];
  public d_id: number;
  public d_name: string[];
  public p_name: string[];
  public s_moisture: number;
  public e_s_moisture: number;
  public light: number;
  public e_light: number;
  public a_moisture: number;
  public e_a_moisture: number;
  public temp: number;
  public e_temp: number;
  public watering_mode: boolean;
} 