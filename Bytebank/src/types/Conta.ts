import { Transacao } from "./Transasao";
import { TipoTransacao } from "./TipoTransasao.js";

let saldo: number = 3000;

const Conta = {
    getSaldo() {
        return saldo;
    },

    getDateAccess(): Date {
        return new Date();
    },

    registerTransaction(newTransaction: Transacao): void {
        if (newTransaction.tipoTransacao === TipoTransacao.DEPOSITO) {
            saldo += newTransaction.valor;
        } 
        else if (newTransaction.tipoTransacao === TipoTransacao.TRANSFERENCIA || 
            newTransaction.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
                saldo -= newTransaction.valor;
        }
        else {
            alert('Tipo de transacao inválido!');
            return;
        }

        console.log(newTransaction);
    }
}

export default Conta;