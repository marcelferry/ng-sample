import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContaCorrenteService } from './conta-corrente.service';
import { ContaCorrenteComponent } from './conta-corrente.component';

import { TipoContaService } from './tipo-conta.service';
import { TipoContaComponent } from './tipo-conta.component';


@NgModule({
  declarations: [
    AppComponent,
    ContaCorrenteComponent,
    TipoContaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ContaCorrenteService, TipoContaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
