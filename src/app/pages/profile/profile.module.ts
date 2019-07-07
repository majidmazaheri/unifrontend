import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill'
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ProfileComponent } from './profile.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

export const routes = [
  { path: '', component: ProfileComponent, pathMatch: 'full' }
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
  declarations: [
    ProfileComponent,
    UserDialogComponent
  ],
  entryComponents:[
    UserDialogComponent
  ]
})
export class profileModule { }