import { JogadorInterface } from "@/app/interfaces/jogador";

const habilidades = [
    {
        'id': 19,
        'descricao': 'Ganhe 5 pontos e escolha uma numeração de efeito; Durante a Rodada Principal, nenhum jogador poderá usar o efeito da numeração escolhida',
        'numero': 1,

        'efeitos': {
            'tipos': ['jogador_atual', 'escolher_numero_habilidade'],
            'jogador_atual_pontuacao_ganhar': 5,

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                let indexJogador = jogadores.findIndex(jogadorArray => jogadorArray.id == jogador.id);

                jogadores.forEach((jogadorArray, index) => {
                    if (index > indexJogador) {
                        jogadorArray.efeito_numeros_bloquear.push(jogador.habilidade_numero_escolhido);
                    }
                });

                return jogadores;
            },
        }
    },

    {
        'id': 20,
        'descricao': 'Ganhe 6 pontos. Você não poderá usar Consumível durante a Rodada Complementar',
        'numero': 2,

        'efeitos': {
            'tipos': ['jogador_atual'],
            'jogador_atual_pontuacao_ganhar': 6,

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;
                jogador.pode_usar_consumivel = false;

                return jogadores;
            },
        }
    },

    {
        'id': 21,
        'descricao': 'Escolha um jogador; Ao fim da Rodada Complementar, se ele usar algum Consumível, você ganha 7 pontos',
        'numero': 3,

        'efeitos': {
            'tipos': ['jogador_atual', 'escolher_jogador', 'final_rodada_complementar'],
            'jogador_atual_pontuacao_final_rodada_complementar': 7,

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                if (jogadorEscolhido.consumivel_escolhido) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            }
        }
    }
];

export default habilidades;