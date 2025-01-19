const game_functions = {
    'embaralharCartas': function (cartas: []) {
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

    'embaralharConsumiveis': function (consumiveis: []) {
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

    'comprarCartas': function (jogador: {}, cartas: [], qtdeCartas: number) {
        let cartasCompradas = cartas.splice(0, qtdeCartas);

        jogador.mao.cartas = cartasCompradas;

        return jogador;
    },

    'comprarConsumiveis': function (jogador: {}, consumiveis: [], qtdeConsumiveis: number) {
        let consumiveisCompradas = consumiveis.splice(0, qtdeConsumiveis);

        jogador.mao.consumiveis = consumiveisCompradas;

        return jogador;
    },

    'validarHabilidadeEscolherJogador': function (jogador: {}) {
        return jogador.habilidade_escolhida.efeitos.tipos.includes('escolher_jogador');
    },

    'escolherJogador': function (jogadorAtual: {}, jogadores: []) {
        let jogadorEfeitoId = prompt(jogadorAtual.nome + ', escolha o ID do jogador:');

        let jogadorEfeito = jogadores.find((jogador) => jogador.id == jogadorEfeitoId);

        return jogadorEfeito;
    },

    'validarHabilidadeCondicao': function (jogadorAtual: {}) {
        let valido = true;

        if (jogadorAtual.habilidade_escolhida.efeitos.tipos.includes('condicao')) {
            valido = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito_condicao(jogadorAtual, jogadorAtual.jogador_escolhido);
        }

        return valido;
    },

    'validarHabilidadeCondicaoEscolhido': function (jogadorAtual: {}) {
        let valido = true;

        if (jogadorAtual.habilidade_escolhida.efeitos.tipos.includes('condicao_escolhido')) {
            valido = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito_condicao(jogadorAtual, jogadorAtual.jogador_escolhido);
        }

        return valido;
    },

    'usarHabilidadeRodadaPrincipal': function (jogadorAtual: {}, jogadores: []) {
        jogadores = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito(jogadorAtual, jogadorAtual.jogador_escolhido , jogadores);

        return jogadores;
    },

    'usarHabilidadeFinalRodadaPrincipal': function (jogadorAtual: {}, jogadores: []) {
        let habilidade = jogadorAtual.habilidade_escolhida;

        if (habilidade.efeitos.tipos.includes('final_rodada_principal')) {
            jogadores = habilidade.efeitos.aplicar_efeito_final_rodada_principal(jogadorAtual, jogadorAtual.jogador_escolhido , jogadores);
        }

        return jogadores;
    },

    'usarConsumivelRodadaComplementar': function (jogadorAtual: {}, jogadores: []) {
        if (jogadorAtual.habilidade_escolhida.efeitos.tipos.includes('alterar_efeito_consumivel')) {
            jogadores = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito_alterar_consumivel(jogadorAtual, jogadorAtual.jogador_escolhido , jogadores);
        } else {
            jogadores = jogadorAtual.consumivel_escolhido.efeitos.aplicar_efeito(jogadorAtual, jogadorAtual.jogador_escolhido , jogadores);
        }

        return jogadores;
    },

    'validarConsumivelEscolherJogador': function (jogador: {}) {
        return jogador.consumivel_escolhido.efeitos.tipos.includes('escolher_jogador');
    },

    'escolherJogadorConsumivel': function (jogadorAtual: {}, jogadores: []) {
        let jogadorEfeitoId = prompt(jogadorAtual.nome + ', escolha o ID do jogador:');

        let jogadorEfeito = jogadores.find((jogador) => jogador.id == jogadorEfeitoId);

        return jogadorEfeito;
    },

    'validarConsumivelJogadorEscolhido': function (jogadorAtual: {}) {
        let valido = true;

        if (jogadorAtual.consumivel_escolhido.efeitos.tipos.includes('condicao')) {
            valido = jogadorAtual.consumivel_escolhido.efeitos.aplicar_efeito_condicao(jogadorAtual, jogadorAtual.jogador_escolhido);
        }

        return valido;
    },

    'usarHabilidadeFinalRodadaComplementar': function (jogadorAtual: {}, jogadores: []) {
        if (jogadorAtual.habilidade_escolhida.efeitos.tipos.includes('final_rodada_complementar')) {
            jogadores = jogadorAtual.habilidade_escolhida.efeitos.aplicar_efeito_final_rodada_complementar(jogadorAtual, jogadorAtual.jogador_escolhido , jogadores);
        }

        return jogadores;
    },
};

export default game_functions;