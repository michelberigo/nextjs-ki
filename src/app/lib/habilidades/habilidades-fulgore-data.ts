const habilidades = [
    {
        'id': 13,
        'descricao': 'Escolha um jogador; Até o final da Rodada Complementar, todo acréscimo de pontos se torna decréscimo',
        'numero': 1,

        'efeitos': {
            'tipos': ['escolher_jogador', 'todo_turno'],
            'jogador_escolhido_pontuacao': -4,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_todo_turno: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },
        }
    },

    {
        'id': 14,
        'descricao': 'Escolha um jogador; Até o final da Rodada Principal, toda vez que ele ganhar pontos, você também ganha a mesma quantidade de ponto',
        'numero': 2,

        'efeitos': {
            'tipos': ['escolher_jogador', 'todo_turno_rodada_principal'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },
        }
    },

    {
        'id': 15,
        'descricao': 'Ganhe 5 pontos. Ao final da Rodada Complementar, perca 1 ponto por cada Consumível usado',
        'numero': 3,

        'efeitos': {
            'tipos': ['jogador_atual'],
            'jogador_atual_pontuacao': -4,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogadorEscolhido.pontuacao_atual += this.jogador_escolhido_pontuacao;
                jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += this.jogador_escolhido_pontuacao;
                jogadorEscolhido.perdeu_pontos_rodada_principal = true;

                return jogadores;
            },
        }
    },
];

export default habilidades;