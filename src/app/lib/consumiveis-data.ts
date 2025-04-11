const consumiveis = [
    {
        'id': 1,
        'descricao': 'Ganhe 6 pontos se você não possuir pontos',
        'descricao_carta': 'Se você jogou Eyedol nesta Rodada: Todos os outros jogadores devem descartar um Consumível',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 6,
            'tipos': ['jogador_atual', 'jogador_atual_condicao'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                if (jogador.pontuacao_atual == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                /*if (jogador.carta_escolhida.id == 1) {
                    jogadores.forEach((jogadorArray) => {
                        if (jogadorArray.id != jogador.id && jogador.mao.consumiveis.length > 0) {
                            let consumivel = jogadorArray.mao.consumiveis[0];

                            jogadorArray.consumiveis_descartados.push(consumivel);
                            jogadorArray.mao.consumiveis = jogadorArray.mao.consumiveis.filter((jogadorConsumivel) => jogadorConsumivel.id != consumivel.id);

                        }
                    });
                }*/

                return jogadores;
            },
        }
    },

    {
        'id': 2,
        'descricao': 'Ganhe 6 pontos se você não possuir pontos',
        'descricao_carta': 'Se você jogou Eyedol nesta Rodada: Todos os outros jogadores devem descartar um Consumível',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 6,
            'tipos': ['jogador_atual', 'jogador_atual_condicao'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                if (jogador.pontuacao_atual == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                /*if (jogador.carta_escolhida.id == 1) {
                    jogadores.forEach((jogadorArray) => {
                        if (jogadorArray.id != jogador.id && jogador.mao.consumiveis.length > 0) {
                            let consumivel = jogadorArray.mao.consumiveis[0];

                            jogadorArray.consumiveis_descartados.push(consumivel);
                            jogadorArray.mao.consumiveis = jogadorArray.mao.consumiveis.filter((jogadorConsumivel) => jogadorConsumivel.id != consumivel.id);

                        }
                    });
                }*/

                return jogadores;
            },
        }
    },

    {
        'id': 3,
        'descricao': 'Ganhe 6 pontos se você não possuir pontos',
        'descricao_carta': 'Se você jogou Eyedol nesta Rodada: Todos os outros jogadores devem descartar um Consumível',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 6,
            'tipos': ['jogador_atual', 'jogador_atual_condicao'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                if (jogador.pontuacao_atual == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                /*if (jogador.carta_escolhida.id == 1) {
                    jogadores.forEach((jogadorArray) => {
                        if (jogadorArray.id != jogador.id && jogador.mao.consumiveis.length > 0) {
                            let consumivel = jogadorArray.mao.consumiveis[0];

                            jogadorArray.consumiveis_descartados.push(consumivel);
                            jogadorArray.mao.consumiveis = jogadorArray.mao.consumiveis.filter((jogadorConsumivel) => jogadorConsumivel.id != consumivel.id);

                        }
                    });
                }*/

                return jogadores;
            },
        }
    },

    {
        'id': 4,
        'descricao': 'Ganhe 6 pontos se você não possuir pontos',
        'descricao_carta': 'Se você jogou Eyedol nesta Rodada: Todos os outros jogadores devem descartar um Consumível',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 6,
            'tipos': ['jogador_atual', 'jogador_atual_condicao'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                if (jogador.pontuacao_atual == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                /*if (jogador.carta_escolhida.id == 1) {
                    jogadores.forEach((jogadorArray) => {
                        if (jogadorArray.id != jogador.id && jogador.mao.consumiveis.length > 0) {
                            let consumivel = jogadorArray.mao.consumiveis[0];

                            jogadorArray.consumiveis_descartados.push(consumivel);
                            jogadorArray.mao.consumiveis = jogadorArray.mao.consumiveis.filter((jogadorConsumivel) => jogadorConsumivel.id != consumivel.id);

                        }
                    });
                }*/

                return jogadores;
            },
        }
    },

    {
        'id': 5,
        'descricao': 'Ganhe 6 pontos se você não possuir pontos',
        'descricao_carta': 'Se você jogou Eyedol nesta Rodada: Todos os outros jogadores devem descartar um Consumível',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 6,
            'tipos': ['jogador_atual', 'jogador_atual_condicao'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                if (jogador.pontuacao_atual == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                /*if (jogador.carta_escolhida.id == 1) {
                    jogadores.forEach((jogadorArray) => {
                        if (jogadorArray.id != jogador.id && jogador.mao.consumiveis.length > 0) {
                            let consumivel = jogadorArray.mao.consumiveis[0];

                            jogadorArray.consumiveis_descartados.push(consumivel);
                            jogadorArray.mao.consumiveis = jogadorArray.mao.consumiveis.filter((jogadorConsumivel) => jogadorConsumivel.id != consumivel.id);

                        }
                    });
                }*/

                return jogadores;
            },
        }
    },

    {
        'id': 6,
        'descricao': 'Ganhe 6 pontos se você não possuir pontos',
        'descricao_carta': 'Se você jogou Eyedol nesta Rodada: Todos os outros jogadores devem descartar um Consumível',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 6,
            'tipos': ['jogador_atual', 'jogador_atual_condicao'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                if (jogador.pontuacao_atual == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                /*if (jogador.carta_escolhida.id == 1) {
                    jogadores.forEach((jogadorArray) => {
                        if (jogadorArray.id != jogador.id && jogador.mao.consumiveis.length > 0) {
                            let consumivel = jogadorArray.mao.consumiveis[0];

                            jogadorArray.consumiveis_descartados.push(consumivel);
                            jogadorArray.mao.consumiveis = jogadorArray.mao.consumiveis.filter((jogadorConsumivel) => jogadorConsumivel.id != consumivel.id);

                        }
                    });
                }*/

                return jogadores;
            },
        }
    },

    /*{
        'id': 2,
        'descricao': 'Ganhe 1 ponto. Ao final da Rodada Complementar, ganhe 3 pontos se outro Consumível foi usado. Se você jogou Riptor nesta Rodada: Você pode descartar um Consumível para ganhar 2 pontos',

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 1,
            'jogador_atual_pontuacao_final_rodada_complementar_ganhar': 3,
            'tipos': ['jogador_atual', 'final_rodada_complementar', 'descartar_consumivel_pos_efeito'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_complementar = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador, jogadorEfeito, jogadores) {
                if (jogadores.some((jogadorArray) => jogadorArray.consumivel_escolhido)) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            },
        }
    },*/
];

export default consumiveis;