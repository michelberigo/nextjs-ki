const habilidades = [
    {
        'id': 7,
        'descricao': 'Escolha um jogador; Ao final da Rodada Principal, se ele ganhar 5 pontos ou mais: Remova todos os pontos dele',
        'numero': 1,

        'efeitos': {
            'tipos': ['escolher_jogador', 'final_rodada_principal'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador, jogadorEscolhido, jogadores) {
                if (jogadorEscolhido.qtde_pontos_ganhos_rodada_principal >= 5) {
                    let pontosPerdidos = jogadorEscolhido.pontuacao_atual;

                    jogadorEscolhido.pontuacao_atual -= pontosPerdidos;
                    jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;

                    if (pontosPerdidos) {
                        jogadorEscolhido.perdeu_pontos_rodada_principal = true;
                    }
                }

                return jogadores;
            }
        }
    },

    {
        'id': 8,
        'descricao': 'Descarte 2 Consumíveis; Ganhe 7 pontos',
        'numero': 2,

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 7,
            'jogador_atual_qtde_consumiveis_descartados': 2,
            'tipos': ['jogador_atual', 'condicao'],

            aplicar_efeito_condicao: function (jogador, jogadorEscolhido) {
                return jogador.mao.consumiveis.length >= this.jogador_atual_qtde_consumiveis_descartados;
            },

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                for (let i = 0; i < this.jogador_atual_qtde_consumiveis_descartados; i++) {
                    jogador.mao.consumiveis.forEach((consumivel) => {
                        jogador.consumiveis_descartados.push(consumivel);
                        jogador.mao.consumiveis = jogador.mao.consumiveis.filter((jogadorConsumivel) => jogadorConsumivel.id != consumivel.id);
                    })
                }

                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },
        }
    },

    {
        'id': 9,
        'descricao': 'Durante a Rodada Complementar, se você jogar um Consumível, a ação dele será "Ganhe 4 pontos"',
        'numero': 3,

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 4,
            'tipos': ['rodada_complementar', 'alterar_efeito_consumivel'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_alterar_consumivel: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_complementar = true;

                return jogadores;
            },
        }
    },
];

export default habilidades;