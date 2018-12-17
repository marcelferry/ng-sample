export class ContaCorrente {
    constructor(public agencia: string, 
                public conta: string,
                public descricao: string,
                public flExcResumo: boolean,
                public id: number,
                public instituicaoId: number,
                public tipoContaId: number,
                public vlSaldo: number
                ) { 
                    flExcResumo = false;            
                }
}

