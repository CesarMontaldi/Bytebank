import { FormatDate } from "../types/FormatDate.js";

export function formatCurrency(valor: number): string {
    return valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}

export function formatterDate(data: Date, format: FormatDate = FormatDate.PADRAO): string {
    if (format === FormatDate.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString('pt-br', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    else if (format === FormatDate.DIA_MES) {
        return data.toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit'
        });
    }

    return data.toLocaleDateString('pt-br'); 
}