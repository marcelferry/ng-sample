import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoContaService } from './tipo-conta.service';

import { TipoConta } from './tipo-conta';
@Component({
  selector: 'app-tipo-conta',
  templateUrl: './tipo-conta.component.html',
  styleUrls: ['./tipo-conta.component.css']
})
export class TipoContaComponent implements OnInit {

  tiposConta: TipoConta[];
  statusCode: number;
  requestProcessing = false;
  processValidation = false;
  tipoContaIdToUpdate = null;

  tipoContaForm = new FormGroup({
    descricao: new FormControl('', Validators.required)	  
  });

  constructor(private tipoContaService: TipoContaService) { }

  ngOnInit() {
    this.getTipoConta();
  }

  getTipoConta() {
    this.tipoContaService.getAllTipoConta()
      .subscribe(data => this.tiposConta = data);
    console.log(this.tiposConta);
  }

  onTipoContaFormSubmit() {
	  this.processValidation = true;   
	  if (this.tipoContaForm.invalid) {
	       return; 
	  }   
    this.preProcess();

    let conta = this.tipoContaForm.value;
    
	  if (this.tipoContaIdToUpdate === null) {  
      this.tipoContaService.getAllTipoConta()
	      .subscribe(tiposConta => {
     	  this.tipoContaService.adicionarTipoConta(conta)
			    .subscribe(successCode => {
            this.statusCode = successCode;
            this.getTipoConta();	
            this.backToTipoConta();
				    },
				    errorCode => this.statusCode = errorCode
			    );
        });		
      
	  } else {  
      conta.id = this.tipoContaIdToUpdate; 		
	    this.tipoContaService.alterarTipoConta(conta)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
				  this.getTipoConta();	
					this.backToTipoConta();
			  },
        errorCode => this.statusCode = errorCode
        );	  
	  }
   }
   
   loadTipoContaToEdit(tipoContaId: number) {
      this.preProcess();
      this.tipoContaService.getTipoContaById(tipoContaId)
	      .subscribe(conta => {
          this.tipoContaIdToUpdate = conta.id;   
          this.tipoContaForm.controls['descricao'].setValue(conta.descricao);
          this.processValidation = true;
					this.requestProcessing = false;   
		      },
          errorCode => this.statusCode = errorCode
        );   
   }
   
  deleteTipoConta(tipoContaId: number) {
    this.preProcess();
    this.tipoContaService.excluirTipoConta(tipoContaId)
      .subscribe(successCode => {
        this.statusCode = 204;
        this.getTipoConta();	
        this.backToTipoConta();
        },
        errorCode => this.statusCode = errorCode
      );    
  }

  preProcess() {
    this.statusCode = null;
    this.requestProcessing = true;   
  }  
 
  backToTipoConta() {
    this.tipoContaIdToUpdate = null;
    this.tipoContaForm.reset();	  
    this.processValidation = false;
  }
}
