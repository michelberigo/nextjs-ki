const habilidades = [
    {
        'id': 4,
        'descricao': 'Escolha um jogador; Ele perde 3 pontos. Ao final da Rodada Principal, se ele não ganhou pontos, ele perde mais 2 pontos',

        'efeitos': {
            'jogador_escolhido_pontuacao': -3,
            'jogador_escolhido_pontuacao_final_rodada_principal': -2,
            'tipos': ['escolher_jogador', 'final_rodada_principal'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogadorEscolhido.pontuacao_atual += this.jogador_escolhido_pontuacao;
                jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += this.jogador_escolhido_pontuacao;
                jogadorEscolhido.perdeu_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador, jogadorEscolhido, jogadores) {
                if (!jogadorEscolhido.ganhou_pontos_rodada_principal) {
                    jogadorEscolhido.pontuacao_atual += this.jogador_escolhido_pontuacao_final_rodada_principal;
                    jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += this.jogador_escolhido_pontuacao_final_rodada_principal;
                    jogadorEscolhido.perdeu_pontos_rodada_principal = true;
                }

                return jogadores;
            }
        }
    },

    {
        'id': 5,
        'descricao': 'Ganhe 4 pontos. Ao final da Rodada Complementar, ganhe 2 pontos por cada cada Consumível usado nesta Rodada',

        'efeitos': {
            'jogador_atual_pontuacao': 4,
            'jogador_atual_pontuacao_final_rodada_complementar': 2,
            'tipos': ['jogador_atual', 'final_rodada_complementar'],

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
                        jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar;
                        jogador.ganhou_pontos_rodada_complementar = true;
                    }
                });

                return jogadores;
            }
        }
    },

    {
        'id': 6,
        'descricao': 'Ganhe 3 pontos. Ao final da Rodada Principal, se você não possuir Consumível, ganhe 3 pontos',

        'efeitos': {
            'jogador_atual_pontuacao': 3,
            'jogador_atual_pontuacao_final_rodada_principal': 3,
            'tipos': ['jogador_atual', 'final_rodada_principal'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual = jogador.pontuacao_atual + this.jogador_atual_pontuacao;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador, jogadorEscolhido, jogadores) {
                let consumiveis = jogador.mao.consumiveis;

                if (consumiveis.length == 0) {
                    jogador.pontuacao_atual = jogador.pontuacao_atual + this.jogador_atual_pontuacao_final_rodada_principal;
                    jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_final_rodada_principal;
                    jogador.ganhou_pontos_rodada_principal = true;
                }

                return jogadores;
            }
        }
    }
];

export default habilidades;