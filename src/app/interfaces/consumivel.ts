import { EfeitoInterface } from "./efeito";

export interface ConsumivelInterface {
    'id': number;
    'descricao': string;
    'descricao_carta': string;
    'efeitos': EfeitoInterface
}