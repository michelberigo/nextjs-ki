const habilidades = [
    {
        'id': 22,
        'descricao': 'Ao final de toda Rodada Complementar, ganhe 3 pontos se algum Consumível foi usado',
        'numero': 1,

        'efeitos': {
            'tipos': ['jogador_atual', 'final_toda_rodada_complementar'],
            'jogador_atual_pontuacao_final_toda_rodada_complementar_ganhar': 3,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_final_toda_rodada_complementar: function (jogador, jogadorEscolhido, jogadores) {
                if (jogadores.some((jogadorArray) => jogadorArray.consumivel_escolhido)) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_toda_rodada_complementar_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_toda_rodada_complementar_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            }
        }
    },

    {
        'id': 23,
        'descricao': 'Escolha uma numeração de efeito; Ao final da Rodada Principal, ganhe 2 pontos por cada efeito usado com a numeração escolhida',
        'numero': 2,

        'efeitos': {
            'tipos': ['jogador_atual', 'final_rodada_principal', 'escolher_numero_habilidade'],
            'jogador_atual_pontuacao_final_rodada_principal_ganhar': 2,

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_principal: function (jogador, jogadorEscolhido, jogadores) {
                let qtdeEfeitosNumeracaoEscolhida = jogadores.filter((jogadorArray) => jogadorArray.habilidade_escolhida.numero == jogador.habilidade_numero_escolhido).length;

                if (qtdeEfeitosNumeracaoEscolhida) {
                    let pontuacaoGanhar = this.jogador_atual_pontuacao_final_rodada_principal_ganhar * qtdeEfeitosNumeracaoEscolhida;

                    jogador.pontuacao_atual += pontuacaoGanhar;
                    jogador.qtde_pontos_ganhos_rodada_principal += pontuacaoGanhar;
                    jogador.ganhou_pontos_rodada_principal = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 24,
        'descricao': 'Escolha um jogador; Ganhe 3 pontos. Ao final da Rodada Principal, se ele ganhou algum ponto, ganhe 3 pontos',
        'numero': 3,

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 3,
            'jogador_atual_pontuacao_final_rodada_principal_ganhar': 3,
            'tipos': ['escolher_jogador', 'final_rodada_principal'],

            aplicar_efeito: function (jogador, jogadorEscolhido, jogadores) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador, jogadorEscolhido, jogadores) {
                if (jogadorEscolhido.ganhou_pontos_rodada_principal) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_principal_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_final_rodada_principal_ganhar;
                    jogador.ganhou_pontos_rodada_principal = true;
                }

                return jogadores;
            }
        }
    }
];

export default habilidades;