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
        'descricao': 'Ganhe 1 ponto',
        'numero': 2,

        'efeitos': {
            'tipos': ['jogador_atual'],
            'jogador_atual_pontuacao_ganhar': 1,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },
        }
    },

    {
        'id': 33,
        'descricao': 'Ganhe 1 ponto',
        'numero': 3,

        'efeitos': {
            'tipos': ['jogador_atual'],
            'jogador_atual_pontuacao_ganhar': 1,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },
        }
    }
];

export default habilidades;