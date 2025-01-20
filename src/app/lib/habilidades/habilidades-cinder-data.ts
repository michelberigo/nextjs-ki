const habilidades = [
    {
        'id': 10,
        'descricao': 'Escolha um jogador; Ele perde 4 pontos',
        'numero': 1,

        'efeitos': {
            'tipos': ['escolher_jogador'],
            'jogador_escolhido_pontuacao_perder': 4,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                let pontosPerdidos = Math.min(this.jogador_escolhido_pontuacao_perder, jogadorEscolhido.pontuacao_atual);

                jogadorEscolhido.pontuacao_atual -= pontosPerdidos;
                jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;

                if (pontosPerdidos) {
                    jogadorEscolhido.perdeu_pontos_rodada_principal = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 11,
        'descricao': 'Ganhe 3 pontos. Ao final da Rodada Complementar, se você não perdeu algum ponto, ganhe 3 pontos',
        'numero': 2,

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 3,
            'jogador_atual_pontuacao_final_rodada_complementar': 3,
            'tipos': ['jogador_atual', 'final_rodada_complementar'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador, jogadorEscolhido, jogadores) {
                if (Math.abs(jogador.qtde_pontos_perdidos_rodada_principal) + Math.abs(jogador.qtde_pontos_perdidos_rodada_complementar) == 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar;
                    jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            }
        }
    },

    {
        'id': 12,
        'descricao': 'Ganhe 4 pontos. Ao final da Rodada Complementar, se todos os jogadores usaram Consumível ou todos os jogadores não usaram Consumível, ganhe 3 pontos',
        'numero': 3,

        'efeitos': {
            'jogador_atual_pontuacao': 4,
            'jogador_atual_pontuacao_final_rodada_complementar_ganhar': 3,
            'tipos': ['jogador_atual', 'final_rodada_complementar'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador, jogadorEscolhido, jogadores) {
                if (jogadores.every((jogadorArray) => jogadorArray.consumivel_escolhido) || jogadores.every((jogadorArray) => !jogadorArray.consumivel_escolhido)) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            },
        }
    },
];

export default habilidades;