const habilidades = [
    {
        'id': 13,
        'descricao': 'Escolha um jogador; Ao final da Rodada Complementar, todo acréscimo de pontos se torna decréscimo',
        'numero': 1,

        'efeitos': {
            'tipos': ['escolher_jogador', 'final_rodada_complementar'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador, jogadorEscolhido, jogadores) {
                jogadorEscolhido.pontuacao_atual -= ((jogadorEscolhido.qtde_pontos_ganhos_rodada_principal + jogadorEscolhido.qtde_pontos_ganhos_rodada_complementar) * 2);
                jogadorEscolhido.qtde_pontos_perdidos_rodada_complementar += ((jogadorEscolhido.qtde_pontos_ganhos_rodada_principal + jogadorEscolhido.qtde_pontos_ganhos_rodada_complementar) * 2);
                jogadorEscolhido.perdeu_pontos_rodada_complementar = true;

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

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador, jogadorEscolhido, jogadores) {
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
            'jogador_atual_pontuacao': 5,
            'jogador_atual_pontuacao_final_rodada_complementar': -1,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador, jogadorEscolhido, jogadores) {
                jogadores.forEach((jogadorArray) => {
                    if (jogadorArray.consumivel_escolhido) {
                        jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar;
                        jogador.qtde_pontos_perdidos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar;
                        jogador.perdeu_pontos_rodada_complementar = true;
                    }
                });

                return jogadores;
            },
        }
    },
];

export default habilidades;