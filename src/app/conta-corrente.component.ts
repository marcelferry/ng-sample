import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContaCorrenteService } from './conta-corrente.service';

import { Instituicao } from './instituicao';
import { ContaCorrente } from './conta-corrente';
import { TipoConta } from './tipo-conta';
@Component({
  selector: 'app-conta-corrente',
  templateUrl: './conta-corrente.component.html',
  styleUrls: ['./conta-corrente.component.css']
})
export class ContaCorrenteComponent implements OnInit {

  instituicoes: Instituicao[];
  tiposConta: TipoConta[];
  contasCorrente: ContaCorrente[];
  statusCode: number;
  requestProcessing = false;
  processValidation = false;
  contaCorrenteIdToUpdate = null;

  contaCorrenteForm = new FormGroup({
    instituicaoId: new FormControl(''),	  
    tipoContaId: new FormControl(''),	  
    agencia: new FormControl('', Validators.required),
    conta: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)	  
  });

  constructor(private contaCorrenteService: ContaCorrenteService) { }

  ngOnInit() {
    this.getInstituicoes();
    this.getTipoConta();
    this.getContaCorrente();
  }

  getInstituicoes() {
    this.contaCorrenteService.getInstutuicoes()
      .subscribe(data => this.instituicoes = data);
  }

  getTipoConta() {
    this.contaCorrenteService.getTipoConta()
      .subscribe(data => this.tiposConta = data);
  }

  getContaCorrente() {
    this.contaCorrenteService.getAllContaCorrente()
      .subscribe(data => this.contasCorrente = data);
  }

  onContaCorrenteFormSubmit() {
	  this.processValidation = true;   
	  if (this.contaCorrenteForm.invalid) {
	       return; 
	  }   
    this.preProcess();

    let conta = this.contaCorrenteForm.value;
    
	  if (this.contaCorrenteIdToUpdate === null) {  
      this.contaCorrenteService.getAllContaCorrente()
	      .subscribe(contasCorrente => {
     	  this.contaCorrenteService.adicionarContaCorrente(conta)
			    .subscribe(successCode => {
            this.statusCode = successCode;
            this.getContaCorrente();	
            this.backToContaCorrente();
				    },
				    errorCode => this.statusCode = errorCode
			    );
        });		
      
	  } else {  
      conta.id = this.contaCorrenteIdToUpdate; 		
	    this.contaCorrenteService.alterarContaCorrente(conta)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
				  this.getContaCorrente();	
					this.backToContaCorrente();
			  },
        errorCode => this.statusCode = errorCode
        );	  
	  }
   }
   
   loadContaCorrenteToEdit(contaCorrenteId: number) {
      this.preProcess();
      this.contaCorrenteService.getContaCorrenteById(contaCorrenteId)
	      .subscribe(conta => {
          this.contaCorrenteIdToUpdate = conta.id;   
          this.contaCorrenteForm.controls['instituicaoId'].setValue(conta.instituicaoId, {onlySelf: true});
          this.contaCorrenteForm.controls['tipoContaId'].setValue(conta.tipoContaId, {onlySelf: true});
          this.contaCorrenteForm.controls['agencia'].setValue(conta.agencia);
          this.contaCorrenteForm.controls['conta'].setValue(conta.conta);
          this.contaCorrenteForm.controls['descricao'].setValue(conta.descricao);
          //this.contaCorrenteForm.setValue({ agencia: conta.agencia, conta: conta.conta, descricao: conta.descricao });
					this.processValidation = true;
					this.requestProcessing = false;   
		      },
          errorCode => this.statusCode = errorCode
        );   
   }
   
  deleteContaCorrente(contaCorrenteId: number) {
    this.preProcess();
    this.contaCorrenteService.excluirContaCorrente(contaCorrenteId)
      .subscribe(successCode => {
        this.statusCode = 204;
        this.getContaCorrente();	
        this.backToContaCorrente();
        },
        errorCode => this.statusCode = errorCode
      );    
  }

  preProcess() {
    this.statusCode = null;
    this.requestProcessing = true;   
  }  
 
  backToContaCorrente() {
    this.contaCorrenteIdToUpdate = null;
    this.contaCorrenteForm.reset();	  
    this.processValidation = false;
  }
}
