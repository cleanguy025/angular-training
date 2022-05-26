import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { OverlayLoadingService } from "src/app/commons/share-modules/overlay-loading/overlay-loading.service";

@Injectable({
  providedIn: 'root'
})

export class HttpLoaderApiInterceptor implements HttpInterceptor {
  totalRequest = 0;
  completeRequest = 0;

  constructor(private loader: OverlayLoadingService) {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequest++;
    this.loader.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.completeRequest++;
        if (this.completeRequest === this.totalRequest) {
          this.loader.hide();
          this.completeRequest = 0;
          this.totalRequest = 0;
        }
      })
    )

  }

}
