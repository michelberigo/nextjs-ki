import { JogadorInterface } from "@/app/interfaces/jogador";

const habilidades = [
    {
        'id': 13,
        'descricao': 'Escolha um jogador; Ao final da Rodada Complementar, todo acréscimo de pontos se torna decréscimo',
        'numero': 1,

        'efeitos': {
            'tipos': ['escolher_jogador', 'final_rodada_complementar'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let pontosPerdidos = Math.min(jogadorEscolhido.qtde_pontos_ganhos_rodada_principal + jogadorEscolhido.qtde_pontos_ganhos_rodada_complementar, jogadorEscolhido.pontuacao_atual);

                jogadorEscolhido.pontuacao_atual -= pontosPerdidos;
                jogadorEscolhido.qtde_pontos_perdidos_rodada_complementar += pontosPerdidos;

                if (pontosPerdidos) {
                    jogadorEscolhido.perdeu_pontos_rodada_complementar = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 14,
        'descricao': 'Escolha um jogador; Ao final da Rodada Principal, você ganha a mesma quantidade de pontos que ele ganhou',
        'numero': 2,

        'efeitos': {
            'tipos': ['escolher_jogador', 'final_rodada_principal'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += jogadorEscolhido.qtde_pontos_ganhos_rodada_principal;
                jogador.qtde_pontos_ganhos_rodada_principal += jogadorEscolhido.qtde_pontos_ganhos_rodada_principal;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            }
        }
    },

    {
        'id': 15,
        'descricao': 'Ganhe 5 pontos. Ao final da Rodada Complementar, perca 1 ponto por cada Consumível usado',
        'numero': 3,

        'efeitos': {
            'tipos': ['jogador_atual', 'final_rodada_complementar'],
            'jogador_atual_pontuacao_ganhar': 5,
            'jogador_atual_pontuacao_final_rodada_complementar_perder': 1,

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogadores.forEach((jogadorArray) => {
                    if (jogadorArray.consumivel_escolhido) {
                        let pontosPerdidos = Math.min(this.jogador_atual_pontuacao_final_rodada_complementar_perder, jogador.pontuacao_atual);

                        jogador.pontuacao_atual -= pontosPerdidos;
                        jogador.qtde_pontos_perdidos_rodada_complementar += pontosPerdidos;
        
                        if (pontosPerdidos) {
                            jogador.perdeu_pontos_rodada_complementar = true;
                        }
                    }
                });

                return jogadores;
            },
        }
    },
];

export default habilidades;