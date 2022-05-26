import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayLoadingService  {
  private loadingSource$ = new Subject<boolean>();
  loading = this.loadingSource$.asObservable();

  constructor() { }

  public show(): void {
    this.loadingSource$.next(true);
  }

  public hide(): void {
    this.loadingSource$.next(false);
  }
}
