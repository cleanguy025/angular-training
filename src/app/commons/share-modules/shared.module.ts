import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from "@angular/material/table";
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { KeysPipe } from "../pipes/keys.pipe";
import { AccountFormCommonComponent } from "./account-form-common/account-form-common.component";
import { DataCommonTableComponent } from "./data-common-table/data-common-table.component";
import { LoadingModalComponent } from "./overlay-loading/loading-modal/loading-modal.component";
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations:[
    AccountFormCommonComponent,
    DataCommonTableComponent,
    LoadingModalComponent,
    KeysPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [
    AccountFormCommonComponent,
    DataCommonTableComponent,
    LoadingModalComponent,
    KeysPipe
  ]
})

export class SharedModule {
}
