import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FakeBackendInterceptor } from "../fake-backend";
import { HttpLoaderApiInterceptor } from "./http-loader-api.interceptor";

export const APP_HTTP_INTERCEPTORS_PROVIDER = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpLoaderApiInterceptor,
    multi: true
  },
  // use fake backend in place of Http service for backend-less development
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true,
  }
]
