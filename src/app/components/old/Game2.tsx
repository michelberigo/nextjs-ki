'use client';

import cartasData from '../lib/cartas-data'
import consumiveisData from '../lib/consumiveis-data'
import game_functions from '@/app/helpers/game_functions'
import { useEffect, useState } from 'react'
import Jogador from './Jogador';

export default function Game() {
    const [turno, setTurno] = useState(0);
    const [cartas, setCartas] = useState([]);
    const [consumiveis, setConsumiveis] = useState([]);
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        iniciarGame();
    }, []);

    useEffect(() => {
        if (turno > 0) {
            setTimeout(() => {
                let finalJogo = validarFinalJogo();
    
                if (finalJogo) {
                    let jogador = buscarVencedorJogo();

                    let confirmar = confirm(jogador.nome + ' é o vencedor! Jogar outra partida?');

                    if (confirmar) {
                        iniciarGame();
                    }
                }
            }, 0);
        }
    }, [jogadores]);

    const iniciarGame = () => {
        let jogadores = buscarJogadores(2);
        let cartas = buscarCartas();
        let consumiveis = buscarConsumiveis();
        let turno = 1;

        cartas = embaralharCartas(cartas);
        consumiveis = embaralharConsumiveis(consumiveis);

        jogadores.forEach((jogador) => {
            jogador = comprarCartas(jogador, cartas, 1);
            jogador = comprarConsumiveis(jogador, consumiveis, 1);
        });
        
        setCartas(cartas);
        setConsumiveis(consumiveis);
        setJogadores(jogadores);
        setTurno(turno);
    }

    const buscarCartas = () => {
        return cartasData;
    }

    const buscarConsumiveis = () => {
        return consumiveisData;
    }

    const buscarJogadores = (qtdeJogadores: number) => {
        let jogadores = [];

        for (let i = 0; i < qtdeJogadores; i++) {
            jogadores.push({
                'id': i + 1,
                'nome': 'Jogador ' + (i + 1),

                'mao': {
                    'cartas': [],
                    'consumiveis': []
                },

                'cartas_descartadas': [],
                'carta_escolhida': '',

                'consumiveis_descartados': [],
                'consumivel_escolhido': '',

                'habilidade_escolhida': '',
                'pontuacao_atual': 5,
                'jogador_escolhido': '',

                'qtde_pontos_perdidos_rodada_principal': 0,
                'qtde_pontos_ganhos_rodada_principal': 0,
                'ganhou_pontos_rodada_principal': false,
                'perdeu_pontos_rodada_principal': false,

                'qtde_pontos_perdidos_rodada_complementar': 0,
                'qtde_pontos_ganhos_rodada_complementar': 0,
                'ganhou_pontos_rodada_complementar': false,
                'perdeu_pontos_rodada_complementar': false,
            });
        }

        return jogadores;
    }

    const embaralharCartas = (cartas: []) => {
        cartas = [...cartas];

        var j, x, i;

        for (i = cartas.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = cartas[i];

            cartas[i] = cartas[j];
            cartas[j] = x;
        }

        return cartas;
    }

    const embaralharConsumiveis = (consumiveis: []) => {
        consumiveis = [...consumiveis];

        var j, x, i;

        for (i = consumiveis.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = consumiveis[i];

            consumiveis[i] = consumiveis[j];
            consumiveis[j] = x;
        }

        return consumiveis;
    }

    const comprarCartas = (jogador: {}, cartas: [], qtdeCartas: number) => {
        let cartasCompradas = cartas.splice(0, qtdeCartas);

        jogador.mao.cartas = cartasCompradas;

        return jogador;
    }

    const comprarConsumiveis = (jogador: {}, consumiveis: [], qtdeConsumiveis: number) => {
        let consumiveisCompradas = consumiveis.splice(0, qtdeConsumiveis);

        jogador.mao.consumiveis = consumiveisCompradas;

        return jogador;
    }

    const listarJogadores = () => {
        let listaJogadores = [...jogadores].map((jogador, index) => {
            return <Jogador key={ index } jogador={jogador} onEscolherCartaChange={ onEscolherCartaChange } onEscolherHabilidadeChange={ onEscolherHabilidadeChange } onEscolherConsumivelChange={ onEscolherConsumivelChange } />;
        });

        return listaJogadores;
    }

    const onEscolherCartaChange = (e) => {
        let jogadorId = e.target.dataset.jogadorId;
        let cartaId = e.target.value;
        let jogador = [...jogadores].find(jogador => jogador.id == jogadorId);
        let jogadorIndex = [...jogadores].findIndex((jogador) => jogador.id == jogadorId);

        let carta = [...jogador.mao.cartas].find((carta) => carta.id == cartaId);

        jogadores[jogadorIndex].carta_escolhida = carta;

        setJogadores(jogadores);
    }

    const onEscolherConsumivelChange = (e) => {
        let jogadorId = e.target.dataset.jogadorId;
        let consumivelId = e.target.value;
        let jogador = [...jogadores].find(jogador => jogador.id == jogadorId);
        let jogadorIndex = [...jogadores].findIndex((jogador) => jogador.id == jogadorId);

        let consumivel = [...jogador.mao.consumiveis].find((consumivel) => consumivel.id == consumivelId);

        jogadores[jogadorIndex].consumivel_escolhido = consumivel;

        setJogadores(jogadores);
    }

    const onEscolherHabilidadeChange = (e) => {
        let jogadorId = e.target.dataset.jogadorId;
        let cartaId = e.target.dataset.cartaId;
        let habilidadeId = e.target.value;
        let jogador = [...jogadores].find(jogador => jogador.id == jogadorId);
        let jogadorIndex = [...jogadores].findIndex((jogador) => jogador.id == jogadorId);

        let carta = [...jogador.mao.cartas].find((carta) => carta.id == cartaId);
        let habilidade = [...carta.habilidades].find((habilidade) => habilidade.id == habilidadeId)

        jogadores[jogadorIndex].carta_escolhida = carta;
        jogadores[jogadorIndex].habilidade_escolhida = habilidade;

        setJogadores(jogadores);
    }

    const onJogarClick = () => {
        let jogadoresArray = [...jogadores];

        //Escolher Jogadores
        jogadoresArray.forEach((jogador) => {
            jogador.jogador_escolhido = game_functions.escolherJogador(jogador, jogadoresArray);
        });

        //Aplicar Efeitos Rodada Principal
        jogadoresArray.forEach((jogador) => {
            jogadoresArray = game_functions.usarHabilidade(jogador, jogadoresArray);

            //finalizarJogada(jogador, jogadoresArray);
        });

        //Aplicar Efeitos Final Rodada Principal
        jogadoresArray.forEach((jogador) => {
            jogadoresArray = game_functions.usarEfeitoFinalRodadaPrincipal(jogador, jogadoresArray);
        });

        //Aplicar Efeitos Rodada Complementar
        jogadoresArray.forEach((jogador) => {
            if (jogador.consumivel_escolhido) {
                jogadoresArray = game_functions.usarConsumivel(jogador, jogadoresArray);
            }
        });

        //Aplicar Efeitos Final Rodada Complementar
        jogadoresArray.forEach((jogador) => {
            jogadoresArray = game_functions.usarEfeitoFinalRodadaComplementar(jogador, jogadoresArray);
        });

        finalizarTurno(jogadoresArray);
    }

    const finalizarTurno = (jogadoresArray: {}) => {
        jogadoresArray.forEach((jogador, index) => {
            jogador.cartas_descartadas.push(jogador.carta_escolhida);
            jogador.mao.cartas = jogador.mao.cartas.filter((carta) => carta.id != jogador.carta_escolhida.id);

            if (jogador.consumivel_escolhido) {
                jogador.consumiveis_descartados.push(jogador.consumivel_escolhido);
                jogador.mao.consumiveis = jogador.mao.consumiveis.filter((consumivel) => consumivel.id != jogador.consumivel_escolhido.id);
            }

            jogador.carta_escolhida = '';
            jogador.consumivel_escolhido = '';
            jogador.habilidade_escolhida = '';
            jogador.jogador_escolhido = '';

            jogador.qtde_pontos_perdidos_rodada_principal = 0;
            jogador.qtde_pontos_ganhos_rodada_principal = 0;
            jogador.ganhou_pontos_rodada_principal = false;
            jogador.perdeu_pontos_rodada_principal = false;

            jogador.qtde_pontos_perdidos_rodada_complementar = 0;
            jogador.qtde_pontos_ganhos_rodada_complementar = 0;
            jogador.ganhou_pontos_rodada_complementar = false;
            jogador.perdeu_pontos_rodada_complementar = false;
        });

        console.log(jogadoresArray);

        setJogadores(jogadoresArray);
    }

    const validarFinalJogo = () => {
        return [...jogadores].every((jogador) => jogador.mao.cartas.length == 0);
    }

    const buscarVencedorJogo = () => {
        return [...jogadores].reduce((maior, atual) => {
            return maior.pontuacao_atual > atual.pontuacao_atual ? maior : atual;
        });
    }

    return (
        <div>
            { listarJogadores() }

            <div className="text-center">
                <button type="button" onClick={ onJogarClick }>Jogar</button>
            </div>
        </div>
    )
}