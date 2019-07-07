import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill'
import { SharedModule } from '../../shared/shared.module';
import { DevicesComponent } from '../devices/devices.component';
import { DeviceDialogComponent } from './deivce-dialog/device-dialog.component'
import { PlantDialogComponent } from './deivce-dialog/plant-dialog/plant-dialog.component';
import { PipesModule } from '../../theme/pipes/pipes.module'

export const routes = [
  { path: '', component: DevicesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    QuillModule,
    SharedModule,
    PipesModule
  ],
  declarations: [DevicesComponent, DeviceDialogComponent, PlantDialogComponent],
  entryComponents:[
    DeviceDialogComponent,
    PlantDialogComponent
  ]
})
export class deviceModule { }