import { EfeitoInterface } from "./efeito";

export interface HabilidadeInterface {
    'id': number;
    'descricao': string;
    'numero': number;
    'efeitos': EfeitoInterface;
}