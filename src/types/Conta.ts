import { GrupoTransacao } from './GrupoTransacao.js';
import { Transacao } from "./Transasao";
import { TipoTransacao } from "./TipoTransasao.js";

const elementValor: HTMLElement = document.querySelector('.extrato .valor');

let saldo: number = JSON.parse(localStorage.getItem('saldo')) || 0;
const transacoes: Transacao[] = JSON.parse(localStorage.getItem('transacoes'),
    (key: string, value: string) => { 
        if (key === 'data') {       
            return new Date(value);       
        }
        return value;
    }
)  || [];

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!')
    }

    if (valor > saldo) {
        throw new Error('Saldo insuficiente!');
    }
    saldo -= valor;
    localStorage.setItem('saldo', saldo.toString());
}

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!')
    }
    saldo += valor;
    localStorage.setItem('saldo', saldo.toString());
}

const Conta = {
    getSaldo() {
        return saldo;
    },

    getDateAccess(): Date {
        return new Date();
    },

    getGrupoTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes
            .sort((date1, date2) => date2.data.getTime() - date1.data.getTime());
        let labelAtualGrupoTransacao: string = '';

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data
                .toLocaleDateString('pt-br', {month: 'long', year: 'numeric'});
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        
        return gruposTransacoes;
    },

    registerTransaction(newTransaction: Transacao): void {
        if (newTransaction.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(newTransaction.valor);
        } 
        else if (newTransaction.tipoTransacao === TipoTransacao.TRANSFERENCIA || 
            newTransaction.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
                debitar(newTransaction.valor);
                newTransaction.valor *= -1;
                elementValor.classList.add('red');
        }
        else {
            throw new Error('Tipo de transacao inválido!');
        }

        transacoes.push(newTransaction);
        console.log(this.getGrupoTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
}

export default Conta;