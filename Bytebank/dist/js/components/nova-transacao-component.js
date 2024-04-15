import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
const elementForm = document.querySelector('.block-nova-transacao form');
elementForm.addEventListener('submit', function (event) {
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
    let data = new Date(inputData.value);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    Conta.registerTransaction(novaTransacao);
    SaldoComponent.update();
    elementForm.reset();
});
