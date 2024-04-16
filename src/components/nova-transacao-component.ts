import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransasao.js";
import { Transacao } from "../types/Transasao.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";

const elementForm = document.querySelector('.block-nova-transacao form') as HTMLFormElement;
 
elementForm.addEventListener('submit', function(event) {
    
    try {
        event.preventDefault();

        if (!elementForm.checkValidity()) {
            alert("Por favor, preencha todos os campos de transação!");
            return;
        }

        const inputTransacao = elementForm.querySelector("#tipoTransacao") as HTMLSelectElement;
        const inputValor = elementForm.querySelector("#valor") as HTMLInputElement;
        const inputData = elementForm.querySelector("#data") as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value + "T00:00:00");

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        }

        Conta.registerTransaction(novaTransacao);
        SaldoComponent.update();
        ExtratoComponent.update();
        elementForm.reset();
    }
    catch(erro) {
        alert(erro.message);
    }
})