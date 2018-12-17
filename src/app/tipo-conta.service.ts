import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TipoConta } from './tipo-conta';

@Injectable({
  providedIn: 'root'
})
export class TipoContaService {

  tipoContaUrl = 'https://apideexemplo.herokuapp.com/api/v1/tipoConta';

  constructor(private http:Http) { 
  }

  getAllTipoConta(): Observable<TipoConta[]> {
    return this.http.get(this.tipoContaUrl)
      .pipe(map(this.extractData));
  }

  getTipoContaById(tipoContaId: number): Observable<TipoConta> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.tipoContaUrl + "/" + tipoContaId)
      .pipe(map(this.extractData));
  }

  adicionarTipoConta(tipoConta: TipoConta):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.tipoContaUrl, tipoConta, options)
    .pipe(map(success => success.status));
  }
  
  alterarTipoConta(tipoConta: TipoConta):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.tipoContaUrl +"/" + tipoConta.id, tipoConta, options)
      .pipe(map(success => success.status));
  }
  
  excluirTipoConta(tipoContaId: number): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.tipoContaUrl +"/"+ tipoContaId)
      .pipe(map(success => success.status));
  }	
  
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  // private handleError (error: Response | any) {
  //   console.error(error.message || error);
  //   return Observable.throw(error.status);
  // }
}
