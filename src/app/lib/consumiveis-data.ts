const consumiveis = [
    {
        'id': 1,
        'descricao': 'Ganhe 6 pontos se você não possuir pontos',

        'efeitos': {
            'jogador_atual_pontuacao': 6,
            'tipos': ['jogador_atual', 'jogador_atual_condicao'],

            aplicar_efeito: function (jogador, jogadorEfeito, jogadores) {
                if (jogador.pontuacao_atual <= 0) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao;
                    jogador.ganhou_pontos_rodada_complementar = true;
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