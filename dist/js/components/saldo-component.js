import Conta from "../types/Conta.js";
import { formatCurrency } from "../utils/formatters.js";
const elementSaldo = document.querySelector('.saldo-valor .valor');
renderSaldo();
function renderSaldo() {
    if (elementSaldo !== null) {
        elementSaldo.textContent = formatCurrency(Conta.getSaldo());
    }
}
const SaldoComponent = {
    update() {
        renderSaldo();
    }
};
export default SaldoComponent;
