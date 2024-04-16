import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";
const elementForm = document.querySelector('.block-nova-transacao form');
elementForm.addEventListener('submit', function (event) {
    try {
        event.preventDefault();
        if (!elementForm.checkValidity()) {
            alert("Por favor, preencha todos os campos de transação!");
            return;
        }
        const inputTransacao = elementForm.querySelector("#tipoTransacao");
        const inputValor = elementForm.querySelector("#valor");
        const inputData = elementForm.querySelector("#data");
        let tipoTransacao = inputTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + "T00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };
        Conta.registerTransaction(novaTransacao);
        SaldoComponent.update();
        ExtratoComponent.update();
        elementForm.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
