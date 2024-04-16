import { FormatDate } from '../types/FormatDate.js';
import { formatterDate } from "../utils/formatters.js";
import Conta from "../types/Conta.js";
const elementDateAccess = document.querySelector('.block-saldo time');
renderDate();
function renderDate() {
    if (elementDateAccess !== null) {
        elementDateAccess.textContent = formatterDate(Conta.getDateAccess(), FormatDate.DIA_SEMANA_DIA_MES_ANO);
    }
}
const DataComponent = {
    update: function () {
        renderDate();
    },
};
export default DataComponent;
