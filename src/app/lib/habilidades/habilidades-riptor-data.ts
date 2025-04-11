import { JogadorInterface } from "@/app/interfaces/jogador";

const habilidades = [
    {
        'id': 4,
        'descricao': 'Escolha um jogador; Ele perde 3 pontos. Ao final da Rodada Principal, se ele não ganhou pontos, ele perde mais 2 pontos',
        'numero': 1,

        'efeitos': {
            'jogador_escolhido_pontuacao_perder': 3,
            'jogador_escolhido_pontuacao_final_rodada_principal_perder': 2,
            'tipos': ['escolher_jogador', 'final_rodada_principal'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let pontosPerdidos = Math.min(this.jogador_escolhido_pontuacao_perder, jogadorEscolhido.pontuacao_atual);

                jogadorEscolhido.pontuacao_atual -= pontosPerdidos;
                jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;

                if (pontosPerdidos) {
                    jogadorEscolhido.perdeu_pontos_rodada_principal = true;
                }

                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                if (!jogadorEscolhido.ganhou_pontos_rodada_principal) {
                    let pontosPerdidos = Math.min(this.jogador_escolhido_pontuacao_final_rodada_principal_perder, jogadorEscolhido.pontuacao_atual);

                    jogadorEscolhido.pontuacao_atual -= pontosPerdidos;
                    jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;

                    if (pontosPerdidos) {
                        jogadorEscolhido.perdeu_pontos_rodada_principal = true;
                    }
                }

                return jogadores;
            }
        }
    },

    {
        'id': 5,
        'descricao': 'Ganhe 4 pontos. Ao final da Rodada Complementar, ganhe 2 pontos por cada cada Consumível usado nesta Rodada',
        'numero': 2,

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 4,
            'jogador_atual_pontuacao_final_rodada_complementar_ganhar': 2,
            'tipos': ['jogador_atual', 'final_rodada_complementar'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogadores.forEach((jogadorArray) => {
                    if (jogadorArray.consumivel_escolhido) {
                        jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                        jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
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
        'numero': 3,

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 3,
            'jogador_atual_pontuacao_final_rodada_principal_ganhar': 3,
            'tipos': ['jogador_atual', 'final_rodada_principal'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual = jogador.pontuacao_atual + this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let consumiveis = jogador.mao.consumiveis;

                if (consumiveis.length == 0) {
                    jogador.pontuacao_atual = jogador.pontuacao_atual + this.jogador_atual_pontuacao_final_rodada_principal_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_final_rodada_principal_ganhar;
                    jogador.ganhou_pontos_rodada_principal = true;
                }

                return jogadores;
            }
        }
    }
];

export default habilidades;