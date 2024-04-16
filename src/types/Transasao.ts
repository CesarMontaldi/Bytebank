import { TipoTransacao } from "./TipoTransasao.js";

export type Transacao = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;
}