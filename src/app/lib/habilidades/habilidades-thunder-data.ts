const habilidades = [
    {
        'id': 31,
        'descricao': 'Ganhe 4 pontos',
        'numero': 1,

        'efeitos': {
            'tipos': ['jogador_atual'],
            'jogador_atual_pontuacao_ganhar': 4,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },
        }
    },

    {
        'id': 32,
        'descricao': 'Ganhe 6 pontos. Ao final da Rodada Complementar, perca 2 pontos por cada Consumível que você possui',
        'numero': 2,

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 6,
            'jogador_atual_pontuacao_final_rodada_complementar_perder': 2,
            'tipos': ['jogador_atual', 'final_rodada_complementar'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador, jogadorEscolhido, jogadores) {
                let pontosPerdidos = Math.min(jogador.mao.consumiveis.length * this.jogador_atual_pontuacao_final_rodada_complementar_perder, jogador.pontuacao_atual);

                jogador.pontuacao_atual -= pontosPerdidos;
                jogador.qtde_pontos_perdidos_rodada_complementar += pontosPerdidos;

                if (pontosPerdidos) {
                    jogador.perdeu_pontos_rodada_complementar = true;
                }

                return jogadores;
            }
        }
    },

    {
        'id': 33,
        'descricao': 'Ao final de toda Rodada Complementar, todos os outros jogadores perdem 2 pontos',
        'numero': 3,

        'efeitos': {
            'tipos': ['final_toda_rodada_complementar'],
            'jogador_escolhido_pontuacao_final_toda_rodada_complementar_perder': 2,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_final_toda_rodada_complementar: function (jogador, jogadorEscolhido, jogadores) {
                let indexJogador = jogadores.findIndex(jogadorArray => jogadorArray.id == jogador.id);

                jogadores.forEach((jogadorArray, index) => {
                    if (indexJogador != index) {
                        jogadorArray.pontuacao_atual -= this.jogador_escolhido_pontuacao_final_toda_rodada_complementar_perder;
                        jogadorArray.qtde_pontos_perdidos_rodada_complementar += this.jogador_escolhido_pontuacao_final_toda_rodada_complementar_perder;
                        jogadorArray.perdeu_pontos_rodada_complementar = true;
                    }
                });

                return jogadores;
            }
        }
    }
];

export default habilidades;