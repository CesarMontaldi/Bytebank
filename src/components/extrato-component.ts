import Conta from "../types/Conta.js";
import { FormatDate } from "../types/FormatDate.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatCurrency, formatterDate } from "../utils/formatters.js";

const elementRegisterTransactionExtrato: HTMLElement = document
    .querySelector('.extrato .registro-transacoes');

renderizaExtrato();
function renderizaExtrato(): void {
    const grupoTransacoes: GrupoTransacao[] = Conta.getGrupoTransacoes();
    let htmlRegistroTransacoes: string = '';

    for (let grupoTransacao of grupoTransacoes) {
        
        let htmlTransacaoItem: string = '';
        for (let transacao of grupoTransacao.transacoes) {
            
            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor">${formatCurrency(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatterDate(transacao.data, FormatDate.DIA_MES)}</time>
                </div> `
        }

        htmlRegistroTransacoes += `
        <div class="transacoes-group">
            <strong class="mes-group">${grupoTransacao.label}</strong>
            ${htmlTransacaoItem}
        </div> `
    }

    if (htmlRegistroTransacoes === '') {
        htmlRegistroTransacoes = '<div>Não há transações registradas.</div>'
    }

    elementRegisterTransactionExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
    update(): void {
        renderizaExtrato();
    }
}

export default ExtratoComponent;