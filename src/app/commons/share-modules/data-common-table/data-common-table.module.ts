import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCommonTableComponent } from './data-common-table.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { KeysPipe } from '../../pipes/keys.pipe';
import { OverlayLoadingModule } from '../overlay-loading/overlay-loading.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    OverlayLoadingModule
  ],
  declarations: [DataCommonTableComponent, KeysPipe],
  exports: [DataCommonTableComponent]
})
export class DataCommonTableModule { }
