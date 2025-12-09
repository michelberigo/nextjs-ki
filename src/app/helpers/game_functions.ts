import { CartaInterface } from "../interfaces/carta";
import { ConsumivelInterface } from "../interfaces/consumivel";
import { JogadorInterface } from "../interfaces/jogador";

const game_functions = {
    'embaralharCartas': function (cartas: CartaInterface[]): CartaInterface[] {
        cartas = [...cartas];

        var j, x, i;

        for (i = cartas.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = cartas[i];

            cartas[i] = cartas[j];
            cartas[j] = x;
        }

        return cartas;
    },

    'embaralharConsumiveis': function (consumiveis: ConsumivelInterface[]) {
        consumiveis = [...consumiveis];

        var j, x, i;

        for (i = consumiveis.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = consumiveis[i];

            consumiveis[i] = consumiveis[j];
            consumiveis[j] = x;
        }

        return consumiveis;
    },

    'comprarCartas': function (jogador: JogadorInterface, cartas: CartaInterface[], qtdeCartas: number) {
        let cartasCompradas = cartas.splice(0, qtdeCartas);

        jogador.mao.cartas = cartasCompradas;

        return jogador;
    },

    'comprarConsumiveis': function (jogador: JogadorInterface, consumiveis: ConsumivelInterface[], qtdeConsumiveis: number) {
        let consumiveisCompradas = consumiveis.splice(0, qtdeConsumiveis);

        jogador.mao.consumiveis = consumiveisCompradas;

        return jogador;
    },

    'validarHabilidadeEscolherJogador': function (jogador: JogadorInterface) {
        return jogador.habilidade_escolhida.efeitos.tipos.includes('escolher_jogador');
    },

    'validarHabilidadeEscolherNumero': function (jogador: JogadorInterface) {
        return jogador.habilidade_escolhida.efeitos.tipos.includes('escolher_numero_habilidade');
    },

    'escolherJogador': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[]): JogadorInterface | null {
        let jogadorEfeitoPrompt = prompt(jogadorAtual.nome + ', escolha o ID do jogador:');
        let jogadorEfeito = null;

        if (jogadorEfeitoPrompt) {
            let jogadorEfeitoId = parseInt(jogadorEfeitoPrompt);

            jogadorEfeito = jogadores.find((jogador) => jogador.id == jogadorEfeitoId);
        }

        return jogadorEfeito;
    },

    'escolherNumeroHabilidade': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[]) {
        return prompt(jogadorAtual.nome + ', escolha o Número do Efeito:');
    },

    'validarHabilidadeCondicao': function (jogadorAtual: JogadorInterface) {
        let valido = true;

        if (jogadorAtual.habilidade_escolhida.efeitos.tipos.includes('condicao')) {
            valido = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito_condicao(jogadorAtual, jogadorAtual.jogador_escolhido);
        }

        return valido;
    },

    'validarHabilidadeCondicaoEscolhido': function (jogadorAtual: JogadorInterface) {
        let valido = true;

        if (jogadorAtual.habilidade_escolhida.efeitos.tipos.includes('condicao_escolhido')) {
            valido = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito_condicao(jogadorAtual, jogadorAtual.jogador_escolhido);
        }

        return valido;
    },

    'usarHabilidadeRodadaPrincipal': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[]) {
        jogadores = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito(jogadorAtual, jogadorAtual.jogador_escolhido , jogadores);

        return jogadores;
    },

    'usarHabilidadeFinalRodadaPrincipal': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[]) {
        let habilidade = jogadorAtual.habilidade_escolhida;

        if (habilidade.efeitos.tipos.includes('final_rodada_principal')) {
            jogadores = habilidade.efeitos.aplicar_efeito_final_rodada_principal(jogadorAtual, jogadorAtual.jogador_escolhido , jogadores);
        }

        return jogadores;
    },

    'usarConsumivelRodadaComplementar': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[]) {
        if (jogadorAtual.habilidade_escolhida.efeitos.tipos.includes('alterar_efeito_consumivel')) {
            jogadores = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito_alterar_consumivel(jogadorAtual, jogadorAtual.jogador_consumivel_escolhido , jogadores);
        } else {
            jogadores = jogadorAtual.consumivel_escolhido.efeitos.aplicar_efeito(jogadorAtual, jogadorAtual.jogador_consumivel_escolhido , jogadores);
        }

        return jogadores;
    },

    'validarConsumivelEscolherJogador': function (jogador: JogadorInterface) {
        return jogador.consumivel_escolhido.efeitos.tipos.includes('escolher_jogador');
    },

    'escolherJogadorConsumivel': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[]) {
        let jogadorEfeitoPrompt = prompt(jogadorAtual.nome + ', escolha o ID do jogador:');
        let jogadorEfeito = null;

        if (jogadorEfeitoPrompt) {
            let jogadorEfeitoId = parseInt(jogadorEfeitoPrompt);

            jogadorEfeito = jogadores.find((jogador) => jogador.id == jogadorEfeitoId);
        }

        return jogadorEfeito;
    },

    'validarConsumivelJogadorEscolhido': function (jogadorAtual: JogadorInterface) {
        let valido = true;

        if (jogadorAtual.consumivel_escolhido.efeitos.tipos.includes('condicao')) {
            valido = jogadorAtual.consumivel_escolhido.efeitos.aplicar_efeito_condicao(jogadorAtual, jogadorAtual.jogador_escolhido);
        }

        return valido;
    },

    'usarHabilidadeFinalRodadaComplementar': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[]) {
        if (jogadorAtual.habilidade_escolhida.efeitos.tipos.includes('final_rodada_complementar')) {
            jogadores = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito_final_rodada_complementar(jogadorAtual, jogadorAtual.jogador_escolhido , jogadores);
        }

        return jogadores;
    },

    'usarHabilidadeFinalTodaRodadaComplementar': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[], carta: CartaInterface) {
        if (carta.habilidade_escolhida?.efeitos.tipos.includes('final_toda_rodada_complementar')) {
            jogadores = carta.habilidade_escolhida.efeitos.aplicar_efeito_final_toda_rodada_complementar(jogadorAtual, jogadorAtual.jogador_escolhido, jogadores);
        }

        return jogadores;
    },
    
    'usarConsumivelFinalRodadaComplementar': function (jogadorAtual: JogadorInterface, jogadores: JogadorInterface[]) {
        if (jogadorAtual.consumivel_escolhido && jogadorAtual.consumivel_escolhido.efeitos.tipos.includes('final_rodada_complementar')) {
            jogadores = jogadorAtual.consumivel_escolhido.efeitos.aplicar_efeito(jogadorAtual, jogadorAtual.jogador_consumivel_escolhido , jogadores);
        }

        return jogadores;
    },

    'validarUsarHabilidade': function (jogadorAtual: JogadorInterface) {
        return !jogadorAtual.efeito_bloqueado;
    },

    'valudarUsarHabilidadeNumero': function (jogadorAtual: JogadorInterface) {
        return !jogadorAtual.efeito_numeros_bloquear.includes(jogadorAtual.habilidade_escolhida.numero.toString());
    },

    //

    'adicionarJogadores': function (qtdeJogadores: number): JogadorInterface[] {
        let jogadores = [];

        for (let i = 0; i < qtdeJogadores; i++) {
            jogadores.push({
                'id': i + 1,
                'nome': 'Jogador ' + (i + 1),
                'mao': {
                    'cartas': [],
                    'consumiveis': []
                },
                'cartas_jogadas': [],
                'cartas_descartadas': [],
                'carta_escolhida': '',
                'consumiveis_descartados': [],
                'consumivel_escolhido': '',
                'pontuacao_atual': 7,
                'habilidade_escolhida': '',
                'jogador_escolhido': '',
                'jogador_consumivel_escolhido': '',
                'habilidade_numero_escolhido': '',
                'qtde_pontos_perdidos_rodada_principal': 0,
                'qtde_pontos_ganhos_rodada_principal': 0,
                'ganhou_pontos_rodada_principal': false,
                'perdeu_pontos_rodada_principal': false,
                'qtde_pontos_perdidos_rodada_complementar': 0,
                'qtde_pontos_ganhos_rodada_complementar': 0,
                'ganhou_pontos_rodada_complementar': false,
                'perdeu_pontos_rodada_complementar': false,
                'efeito_bloqueado': false,
                'efeito_numeros_bloquear': [],
                'pode_usar_consumivel': true
            });
        }

        return jogadores;
    },

    'limparJogadorFinalRodada': function (jogador: JogadorInterface) {
        jogador.carta_escolhida = '';
        jogador.consumivel_escolhido = '';
        jogador.habilidade_escolhida = '';
        jogador.jogador_escolhido = '';
        jogador.jogador_consumivel_escolhido = '';

        jogador.qtde_pontos_perdidos_rodada_principal = 0;
        jogador.qtde_pontos_ganhos_rodada_principal = 0;
        jogador.ganhou_pontos_rodada_principal = false;
        jogador.perdeu_pontos_rodada_principal = false;

        jogador.qtde_pontos_perdidos_rodada_complementar = 0;
        jogador.qtde_pontos_ganhos_rodada_complementar = 0;
        jogador.ganhou_pontos_rodada_complementar = false;
        jogador.perdeu_pontos_rodada_complementar = false;

        jogador.efeito_bloqueado = false;
        jogador.efeito_numeros_bloquear = [];
        jogador.pode_usar_consumivel = true;
        
        return jogador;
    }
};

export default game_functions;