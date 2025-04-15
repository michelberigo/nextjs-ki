import { JogadorInterface } from "./jogador";

export interface EfeitoInterface {
    'todos_jogadores_pontuacao_perder'?: number;
    'jogador_atual_pontuacao_ganhar'?: number;
    'jogador_atual_pontuacao'?: number;
    'jogador_escolhido_pontuacao'?: number;
    'efeito_condicao_pontuacao'?: number;
    'jogador_atual_pontuacao_final_rodada_principal_perder'?: number;
    'tipos': string[];
    'aplicar_efeito_condicao'?: (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface) => boolean;
    'aplicar_efeito_final_rodada_complementar'?: (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) => JogadorInterface[];
    'aplicar_efeito_final_toda_rodada_complementar'?: (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) => JogadorInterface[];
    'aplicar_efeito': (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) => JogadorInterface[];
    'aplicar_efeito_final_rodada_principal'?: (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) => JogadorInterface[];
    'aplicar_efeito_alterar_consumivel'?: (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) => JogadorInterface[];
}