import { JogadorInterface } from "@/app/interfaces/jogador";

const habilidades = [
    {
        'id': 16,
        'descricao': 'Perca 4 pontos. Durante a Rodada Principal, nenhum efeito poderá ser ativado',
        'numero': 1,

        'efeitos': {
            'tipos': ['jogador_atual', 'condicao'],
            'jogador_atual_pontuacao_perder': 4,

            aplicar_efeito_condicao: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface) {
                return jogador.pontuacao_atual >= this.jogador_atual_pontuacao_perder;
            },

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let pontosPerdidos = Math.min(this.jogador_atual_pontuacao_perder, jogador.pontuacao_atual);

                jogador.pontuacao_atual -= pontosPerdidos;
                jogador.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;

                if (pontosPerdidos) {
                    jogador.perdeu_pontos_rodada_principal = true;
                }

                let indexJogador = jogadores.findIndex(jogadorArray => jogadorArray.id == jogador.id);

                jogadores.forEach((jogadorArray, index) => {
                    if (index > indexJogador) {
                        jogadorArray.efeito_bloqueado = true;
                    }
                });

                return jogadores;
            },
        }
    },

    {
        'id': 17,
        'descricao': 'Ganhe 2 pontos. Ao final da Rodada Complementar, se você não usar Consumível, ganhe 3 pontos',
        'numero': 2,

        'efeitos': {
            'tipos': ['jogador_atual', 'final_rodada_complementar'],
            'jogador_atual_pontuacao_ganhar': 2,
            'jogador_atual_pontuacao_final_rodada_complementar_ganhar': 3,

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_complementar: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                if (!jogador.consumivel_escolhido) {
                    jogador.pontuacao_atual += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                    jogador.qtde_pontos_ganhos_rodada_complementar += this.jogador_atual_pontuacao_final_rodada_complementar_ganhar;
                    jogador.ganhou_pontos_rodada_complementar = true;
                }

                return jogadores;
            },
        }
    },

    {
        'id': 18,
        'descricao': 'Ganhe 5 pontos. Ao final da Rodada Principal, se algum jogador usou a mesma numeração de efeito, perca 2 pontos',
        'numero': 3,

        'efeitos': {
            'tipos': ['jogador_atual', 'final_rodada_principal'],
            'jogador_atual_pontuacao_ganhar': 5,
            'jogador_atual_pontuacao_final_rodada_principal_perder': 2,

            aplicar_efeito: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                jogador.pontuacao_atual += this.jogador_atual_pontuacao_ganhar;
                jogador.qtde_pontos_ganhos_rodada_principal += this.jogador_atual_pontuacao_ganhar;
                jogador.ganhou_pontos_rodada_principal = true;

                return jogadores;
            },

            aplicar_efeito_final_rodada_principal: function (jogador: JogadorInterface, jogadorEscolhido: JogadorInterface, jogadores: JogadorInterface[]) {
                let indexJogador = jogadores.findIndex(jogadorArray => jogadorArray.id == jogador.id);

                if (jogadores.some((jogadorArray, index) => index != indexJogador && jogador.habilidade_escolhida.numero == jogadorArray.habilidade_escolhida.numero)) {
                    let pontosPerdidos = Math.min(this.jogador_atual_pontuacao_final_rodada_principal_perder, jogador.pontuacao_atual);

                    jogador.pontuacao_atual -= pontosPerdidos;
                    jogador.qtde_pontos_perdidos_rodada_principal += pontosPerdidos;
    
                    if (pontosPerdidos) {
                        jogador.perdeu_pontos_rodada_principal = true;
                    }
                }

                return jogadores;
            },
        }
    },
];

export default habilidades;