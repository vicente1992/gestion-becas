import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

export interface Options {
  headers?: HttpHeaders;
  params?: HttpParams;
}
@Injectable()
export class HttpService {
  protected http = inject(HttpClient);

  public createDefaultOptions(): Options {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
      })
    };
  }

  public doGet<T>(serviceUrl: string, params?: Params): Observable<T> {

    return this.http.get<T>(serviceUrl, { params });
  }

  public doPost<T>(serviceUrl: string, body: T, opts?: Options): Observable<T> {
    const ropts = this.createOptions(opts);
    return this.http.post<T>(serviceUrl, body, ropts);
  }
  public doPatch<T, R>(serviceUrl: string, body: T, opts?: Options): Observable<R> {
    const ropts = this.createOptions(opts);

    return this.http.patch<R>(serviceUrl, body, ropts);
  }

  public doDelete<R>(serviceUrl: string, opts?: Options): Observable<R> {
    const ropts = this.createOptions(opts);

    return this.http.delete<R>(serviceUrl, ropts);
  }

  public doGetParameters<T>(serviceUrl: string, parametros: HttpParams, opts?: Options): Observable<T> {
    const ropts = this.createOptions(opts);
    const options = parametros !== null ? {
      headers: ropts.headers,
      params: parametros
    } as Options : ropts;

    return this.http.get<T>(serviceUrl, options);
  }

  private createOptions(opts: any): Options {
    const defaultOpts: any = this.createDefaultOptions();

    if (opts) {
      opts = {
        params: opts.params || defaultOpts.params,
        headers: opts.headers || defaultOpts.headers
      };

      // if (!opts.headers.get('Content-Type')) {
      //   opts.headers = opts.headers.set('Content-Type', defaultOpts.headers.get('Content-Type'));
      // }
    }

    return opts || defaultOpts;
  }
}
