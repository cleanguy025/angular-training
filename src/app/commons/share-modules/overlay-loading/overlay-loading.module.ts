import { NgModule } from "@angular/core";
import { LoadingModalComponent } from "./loading-modal/loading-modal.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [LoadingModalComponent],
  imports: [MatProgressSpinnerModule, CommonModule],
  exports: [LoadingModalComponent]
})

export class OverlayLoadingModule {

}
