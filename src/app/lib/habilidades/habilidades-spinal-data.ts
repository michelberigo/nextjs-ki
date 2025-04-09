const habilidades = [
    {
        'id': 28,
        'descricao': 'Ao final da Rodada Principal, todo decréscimo de pontos se torna acréscimo',
        'numero': 1,

        'efeitos': {
            'tipos': ['jogador_atual', 'final_rodada_principal'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador, jogadorEscolhido, jogadores) {
                let pontosGanhos = jogador.qtde_pontos_perdidos_rodada_principal * 2;

                jogador.pontuacao_atual += pontosGanhos;
                jogador.qtde_pontos_ganhos_rodada_principal += pontosGanhos;

                if (pontosGanhos) {
                    jogador.ganhou_pontos_rodada_principal = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 29,
        'descricao': 'Ganhe 1 ponto. Descarte 1 consumível dos outros jogadores, se possível',
        'numero': 2,

        'efeitos': {
            'tipos': ['jogador_atual'],
            'jogador_atual_pontuacao_ganhar': 1,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                let indexJogador = jogadores.findIndex(jogadorArray => jogadorArray.id == jogador.id);
                let consumivelEscolhido = null;

                jogadores.forEach((jogadorArray, index) => {
                    if (indexJogador != index && jogadorArray.mao.consumiveis.length > 0) {
                        [consumivelEscolhido] = jogadorArray.mao.consumiveis.splice(0, 1);

                        jogadorArray.consumiveis_descartados.push(consumivelEscolhido);
                    }
                });

                return jogadores;
            },
        }
    },

    {
        'id': 30,
        'descricao': 'Escolha um jogador; Ele perde 3 pontos por cada Consumível que possuir',
        'numero': 3,

        'efeitos': {
            'tipos': ['escolher_jogador'],
            'jogador_escolhido_pontuacao_perder': 3,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                let pontosPerdidos = Math.min(jogadorEscolhido.mao.consumiveis.length * this.jogador_escolhido_pontuacao_perder, jogadorEscolhido.pontuacao_atual);

                jogadorEscolhido.pontuacao_atual -= pontosPerdidos;
                jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;

                if (pontosPerdidos) {
                    jogadorEscolhido.perdeu_pontos_rodada_principal = true;
                }

                return jogadores;
            },
        }
    }
];

export default habilidades;