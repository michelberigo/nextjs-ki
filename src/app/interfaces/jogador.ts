import { CartaInterface } from "./carta";
import { ConsumivelInterface } from "./consumivel";
import { HabilidadeInterface } from "./habilidade";

export interface JogadorInterface {
    'id': number;
    'nome': string;
    'cartas_jogadas': CartaInterface[];
    'cartas_descartadas': CartaInterface[];
    'carta_escolhida': CartaInterface;
    'consumiveis_descartados': ConsumivelInterface[];
    'consumivel_escolhido': ConsumivelInterface;
    'pontuacao_atual': number;
    'habilidade_escolhida': HabilidadeInterface;
    'jogador_escolhido': JogadorInterface;
    'jogador_consumivel_escolhido': ConsumivelInterface;
    'habilidade_numero_escolhido': string;
    'qtde_pontos_perdidos_rodada_principal': number;
    'qtde_pontos_ganhos_rodada_principal': number;
    'ganhou_pontos_rodada_principal': boolean;
    'perdeu_pontos_rodada_principal': boolean;
    'qtde_pontos_perdidos_rodada_complementar': number;
    'qtde_pontos_ganhos_rodada_complementar': number;
    'ganhou_pontos_rodada_complementar': boolean;
    'perdeu_pontos_rodada_complementar': boolean;
    'efeito_bloqueado': boolean;
    'efeito_numeros_bloquear': string[];
    'pode_usar_consumivel': boolean;

    'mao': {
        'cartas': CartaInterface[];
        'consumiveis': ConsumivelInterface[];
    };
}