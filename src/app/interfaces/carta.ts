import { HabilidadeInterface } from "./habilidade";

export interface CartaInterface {
    'id': number;
    'nome': string;
    'slug': string;
    'habilidades': HabilidadeInterface[];
    'habilidade_escolhida'?: HabilidadeInterface;
}