//Realizando apenas efeitos principais

import { JogadorInterface } from "../interfaces/jogador";

const consumiveis = [
    {
        'id': 1,
        'descricao': 'Ganhe 5 pontos se você não possuir pontos',
        'descricao_carta': '',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 5,
            'tipos': ['jogador_atual'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                if (jogador.pontuacao_atual == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 2,
        'descricao': 'Ganhe 1 ponto. Ao final da Rodada Complementar, ganhe 3 pontos se outro Consumível foi usado',
        'descricao_carta': '',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 1,
            'jogador_atual_pontuacao_final_rodada_complementar_ganhar': 3,
            'tipos': ['jogador_atual', 'final_rodada_complementar'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_complementar = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let indexJogador = jogadores.findIndex(jogadorArray => jogadorArray.id == jogador.id);

                if (jogadores.some((jogadorArray, index) => indexJogador != index && jogadorArray.consumivel_escolhido)) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            }
        }
    },

    {
        'id': 3,
        'descricao': 'Ganhe 2 pontos',
        'descricao_carta': '',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 2,
            'tipos': ['jogador_atual'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_complementar = true;

                return jogadores;
            },
        }
    },

    {
        'id': 4,
        'descricao': 'Ganhe 3 pontos. Perca 1 ponto se você possuir outro Consumível',
        'descricao_carta': '',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 3,
            'jogador_atual_pontuacao_perder': 1,
            'tipos': ['jogador_atual'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_complementar = true;

                if (jogador.mao.consumiveis.some((consumivel) => consumivel.id != jogador.consumivel_escolhido.id)) {
                    let pontosPerdidos = Math.min(this.jogador_atual_pontuacao_perder, jogador.pontuacao_atual);

                    jogador.pontuacao_atual -= pontosPerdidos;
                    jogador.qtde_pontos_perdidos_rodada_complementar += pontosPerdidos;

                    if (pontosPerdidos) {
                        jogador.perdeu_pontos_rodada_complementar = true;
                    }
                }

                return jogadores;
            },
        }
    },

    {
        'id': 5,
        'descricao': 'Ganhe 4 pontos se você perdeu pontos durante a Rodada Principal',
        'descricao_carta': '',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 4,
            'tipos': ['jogador_atual'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                if (jogador.perdeu_pontos_rodada_principal) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 6,
        'descricao': 'Pegue 1 ponto de cada outro jogador (se possível)',
        'descricao_carta': '',

        'efeitos': {
            'jogador_escolhido_pontuacao_perder': 1,
            'tipos': ['jogador_atual'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let indexJogador = jogadores.findIndex(jogadorArray => jogadorArray.id == jogador.id);
                let pontosPerdidos = null;

                jogadores.forEach((jogadorArray, index) => {
                    if (indexJogador != index) {
                        pontosPerdidos = Math.min(this.jogador_escolhido_pontuacao_perder, jogadorArray.pontuacao_atual);

                        jogadorArray.pontuacao_atual -= pontosPerdidos;
                        jogadorArray.qtde_pontos_perdidos_rodada_complementar += pontosPerdidos;
        
                        jogador.pontuacao_atual += pontosPerdidos;
                        jogador.qtde_pontos_ganhos_rodada_complementar += pontosPerdidos;
        
                        if (pontosPerdidos) {
                            jogadorArray.perdeu_pontos_rodada_complementar = true;
                            jogador.ganhou_pontos_rodada_complementar = true;
                        }
                    }
                });

                return jogadores;
            },
        }
    },

    {
        'id': 7,
        'descricao': 'Escolha um jogador; Ele perde 3 pontos',
        'descricao_carta': '',

        'efeitos': {
            'jogador_escolhido_pontuacao_perder': 3,
            'tipos': ['jogador_atual', 'escolher_jogador'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let pontosPerdidos = Math.min(this.jogador_escolhido_pontuacao_perder, jogadorEscolhido.pontuacao_atual);

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
        'id': 8,
        'descricao': 'Escolha um jogador; Ele perde 2 pontos por cada consumível que possuir',
        'descricao_carta': '',

        'efeitos': {
            'jogador_escolhido_pontuacao_perder': 2,
            'tipos': ['jogador_atual', 'escolher_jogador'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let pontosPerdidos = Math.min(this.jogador_escolhido_pontuacao_perder * jogadorEscolhido.mao.consumiveis.length, jogadorEscolhido.pontuacao_atual);

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
        'id': 9,
        'descricao': 'Todos os outros jogadores perdem 2 pontos (se possível)',
        'descricao_carta': '',

        'efeitos': {
            'jogador_escolhido_pontuacao_perder': 2,
            'tipos': ['jogador_atual'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let indexJogador = jogadores.findIndex(jogadorArray => jogadorArray.id == jogador.id);
                let pontosPerdidos = null;

                jogadores.forEach((jogadorArray, index) => {
                    if (indexJogador != index) {
                        pontosPerdidos = Math.min(this.jogador_escolhido_pontuacao_perder, jogadorArray.pontuacao_atual);

                        jogadorArray.pontuacao_atual -= pontosPerdidos;
                        jogadorArray.qtde_pontos_perdidos_rodada_complementar += pontosPerdidos;
        
                        if (pontosPerdidos) {
                            jogadorArray.perdeu_pontos_rodada_complementar = true;
                        }
                    }
                });

                return jogadores;
            },
        }
    },
];

export default consumiveis;