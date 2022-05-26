import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverlayLoadingService } from '../overlay-loading.service';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingModalComponent implements OnInit, OnDestroy{
  @Input() loading!: boolean;
  unSubscribeAll$: Subject<any>;

  constructor(private overlay: OverlayLoadingService,
              private cdr: ChangeDetectorRef) {
    this.unSubscribeAll$ = new Subject<any>();
   }
  ngOnDestroy(): void {
    this.unSubscribeAll$.next();
    this.unSubscribeAll$.complete();
  }

  ngOnInit() {
    this.overlay.loading.pipe(
      takeUntil(this.unSubscribeAll$)
    ).subscribe(isLoading => {
      this.loading = isLoading;
    })
  }

}
