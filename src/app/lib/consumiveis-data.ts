const consumiveis = [
    {
        'id': 1,
        'descricao': 'Ganhe 6 pontos se você não possuir pontos. Se você jogou Eyedol nesta Rodada: Todos os outros jogadores devem descartar um Consumível',

        'efeitos': {
            'jogador_atual_pontuacao': 6,
            'tipos': ['jogador_atual', 'jogador_atual_condicao'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                if (jogador.pontuacao_atual == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                if (jogador.carta_escolhida.id == 1) {
                    jogadores.forEach((jogadorArray) => {
                        if (jogadorArray.id != jogador.id && jogador.mao.consumiveis.length > 0) {
                            let consumivel = jogadorArray.mao.consumiveis[0];

                            jogadorArray.consumiveis_descartados.push(consumivel);
                            jogadorArray.mao.consumiveis = jogadorArray.mao.consumiveis.filter((jogadorConsumivel) => jogadorConsumivel.id != consumivel.id);

                        }
                    });
                }

                return jogadores;
            },
        }
    },

    {
        'id': 2,
        'descricao': 'Ganhe 1 ponto',

        'efeitos': {
            'jogador_atual_pontuacao': 1,
            'tipos': ['jogador_atual'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao;
                jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao;
                jogador.ganhou_pontos_rodada_complementar = true;

                return jogadores;
            },
        }
    },
];

export default consumiveis;