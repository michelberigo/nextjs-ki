import { JogadorInterface } from "@/app/interfaces/jogador";

const habilidades = [
    {
        'id': 1,
        'descricao': 'Escolha um jogador com 13 pontos ou mais; Você e ele devem ganhar ou perder pontos até ficar com 7 pontos',
        'numero': 1,

        'efeitos': {
            'jogador_atual_pontuacao': 7,
            'jogador_escolhido_pontuacao': 7,
            'efeito_condicao_pontuacao': 13,
            'tipos': ['condicao_escolhido', 'escolher_jogador', 'jogador_atual'],

            aplicar_efeito_condicao: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface) {
                return jogadorEscolhido.pontuacao_atual >= this.efeito_condicao_pontuacao;
            },

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                if (jogador.pontuacao_atual > this.jogador_atual_pontuacao) {
                    jogador.qtde_pontos_perdidos_rodada_principal += jogador.pontuacao_atual - this.jogador_atual_pontuacao;
                    jogador.pontuacao_atual = this.jogador_atual_pontuacao;
                    jogador.perdeu_pontos_rodada_principal = true;
                } else if (jogador.pontuacao_atual < this.jogador_atual_pontuacao) {
                    jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao - jogador.pontuacao_atual;
                    jogador.pontuacao_atual = this.jogador_atual_pontuacao;
                    jogador.ganhou_pontos_rodada_principal = true;
                }

                if (jogadorEscolhido.pontuacao_atual > this.jogador_escolhido_pontuacao) {
                    jogadorEscolhido.qtde_pontos_perdidos_rodada_principal += jogadorEscolhido.pontuacao_atual - this.jogador_escolhido_pontuacao;
                    jogadorEscolhido.pontuacao_atual = this.jogador_escolhido_pontuacao;
                    jogadorEscolhido.perdeu_pontos_rodada_principal = true;
                } else if (jogadorEscolhido.pontuacao_atual < this.jogador_escolhido_pontuacao) {
                    jogadorEscolhido.qtde_pontos_ganhos_rodada_principal += this.jogador_escolhido_pontuacao - jogadorEscolhido.pontuacao_atual;
                    jogadorEscolhido.pontuacao_atual = this.jogador_escolhido_pontuacao;
                    jogadorEscolhido.ganhou_pontos_rodada_principal = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 2,
        'descricao': 'Todos os jogadores perdem 7 pontos. Ganhe 2 pontos',
        'numero': 2,

        'efeitos': {
            'todos_jogadores_pontuacao_perder': 7,
            'jogador_atual_pontuacao_ganhar': 2,
            'tipos': ['todos_jogadores', 'jogador_atual'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogadores.forEach((jogador) => {
                    let pontosPerdidos = Math.min(this.todos_jogadores_pontuacao_perder, jogador.pontuacao_atual);

                    jogador.pontuacao_atual -= pontosPerdidos;
                    jogador.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;

                    if (pontosPerdidos) {
                        jogador.perdeu_pontos_rodada_principal = true;
                    }
                });

                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },
        }
    },

    {
        'id': 3,
        'descricao': 'Ganhe 10 pontos. Ao final da Rodada Principal, se outro jogador fez você perder algum ponto: Perca 6 pontos',
        'numero': 3,

        'efeitos': {
            'jogador_atual_pontuacao_ganhar': 10,
            'jogador_atual_pontuacao_final_rodada_principal_perder': 6,
            'tipos': ['jogador_atual', 'final_rodada_principal'],

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_principal(jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                if (jogador.perdeu_pontos_rodada_principal) {
                    let pontosPerdidos = Math.min(this.jogador_atual_pontuacao_final_rodada_principal_perder, jogador.pontuacao_atual);

                    jogador.pontuacao_atual -= pontosPerdidos;
                    jogador.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;

                    if (pontosPerdidos) {
                        jogador.perdeu_pontos_rodada_principal = true;
                    }
                }

                return jogadores;
            }
        }
    }
];

export default habilidades;