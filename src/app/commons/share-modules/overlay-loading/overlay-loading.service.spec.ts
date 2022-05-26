/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OverlayLoadingService } from './overlay-loading.service';

describe('Service: OverlayLoading', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverlayLoadingService]
    });
  });

  it('should ...', inject([OverlayLoadingService], (service: OverlayLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
