import { JogadorInterface } from "@/app/interfaces/jogador";

const habilidades = [
    {
        'id': 25,
        'descricao': 'Ao final de toda Rodada Complementar, ganhe 2 pontos',
        'numero': 1,

        'efeitos': {
            'tipos': ['jogador_atual', 'final_toda_rodada_complementar'],
            'jogador_atual_pontuacao_final_toda_rodada_complementar_ganhar': 2,

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                return jogadores;
            },

            aplicar_efeito_final_toda_rodada_complementar: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_toda_rodada_complementar_ganhar;
                jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_toda_rodada_complementar_ganhar;
                jogador.ganhou_pontos_rodada_complementar = true;

                return jogadores;
            }
        }
    },

    {
        'id': 26,
        'descricao': 'Escolha um jogador; Pegue 3 pontos dele (ou pegue todos os pontos se ele possuir menos de 3 pontos)',
        'numero': 2,

        'efeitos': {
            'tipos': ['escolher_jogador', 'jogador_atual'],
            'jogador_escolhido_pontuacao_perder': 3,

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let pontosPerdidosJogadorEscolhido = Math.min(this.jogador_escolhido_pontuacao_perder, jogadorEscolhido.pontuacao_atual);

                jogadorEscolhido.pontuacao_atual -= pontosPerdidosJogadorEscolhido;
                jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += pontosPerdidosJogadorEscolhido;

                jogador.pontuacao_atual += pontosPerdidosJogadorEscolhido;
                jogador.qtde_pontos_ganhos_rodada_principal += pontosPerdidosJogadorEscolhido;

                if (pontosPerdidosJogadorEscolhido) {
                    jogadorEscolhido.perdeu_pontos_rodada_principal = true;
                    jogador.ganhou_pontos_rodada_principal = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 27,
        'descricao': 'Ao final da Rodada Complementar, ganhe 4 pontos por cada Consumível usado nesta Rodada',
        'numero': 3,

        'efeitos': {
            'jogador_atual_pontuacao_final_rodada_complementar_ganhar': 4,
            'tipos': ['jogador_atual', 'final_rodada_complementar'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogadores.forEach((jogadorArray) => {
                    if (jogadorArray.consumivel_escolhido) {
                        jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                        jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                        jogador.ganhou_pontos_rodada_complementar = true;
                    }
                });

                return jogadores;
            }
        }
    }
];

export default habilidades;