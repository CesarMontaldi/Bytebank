import { Transacao } from './Transasao.js';

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[]; 
}