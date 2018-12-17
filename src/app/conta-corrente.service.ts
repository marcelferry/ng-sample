import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContaCorrente } from './conta-corrente';
import { Instituicao } from './instituicao';
import { TipoConta } from './tipo-conta';

@Injectable({
  providedIn: 'root'
})
export class ContaCorrenteService {

  contaCorrenteUrl = 'https://apideexemplo.herokuapp.com/api/v1/contacorrente';
  instituicaoUrl = 'https://apideexemplo.herokuapp.com/api/v1/instituicao';
  tipoContaUrl = 'https://apideexemplo.herokuapp.com/api/v1/tipoConta';

  constructor(private http:Http) { 
  }

  getAllContaCorrente(): Observable<ContaCorrente[]> {
    return this.http.get(this.contaCorrenteUrl)
      .pipe(map(this.extractData));
  }

  getContaCorrenteById(contaCorrenteId: number): Observable<ContaCorrente> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.contaCorrenteUrl + "/" + contaCorrenteId)
      .pipe(map(this.extractData));
  }

  getInstutuicoes(): Observable<Instituicao[]> {
    return this.http.get(this.instituicaoUrl)
      .pipe(map(this.extractData));
  }

  getTipoConta(): Observable<TipoConta[]> {
    return this.http.get(this.tipoContaUrl)
      .pipe(map(this.extractData));
  }

  adicionarContaCorrente(contaCorrente: ContaCorrente):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.contaCorrenteUrl, contaCorrente, options)
    .pipe(map(success => success.status));
  }
  
  alterarContaCorrente(contaCorrente: ContaCorrente):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.contaCorrenteUrl +"/" + contaCorrente.id, contaCorrente, options)
      .pipe(map(success => success.status));
  }
  
  excluirContaCorrente(contaCorrenteId: number): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.contaCorrenteUrl +"/"+ contaCorrenteId)
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
