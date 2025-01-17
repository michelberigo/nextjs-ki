'use client'

import game_functions from '../helpers/game_functions';
import cartasData from '../lib/cartas-data';
import consumiveisData from '../lib/consumiveis-data';
import { useEffect, useState } from "react";
import Jogador from './Jogador';

export default function Game() {
    const [jogadores, setJogadores] = useState([]);
    const [cartas, setCartas] = useState([]);
    const [consumiveis, setConsumiveis] = useState([]);
    const [jogadorTurnoAtual, setJogadorTurnoAtual] = useState(0);

    const [game, setGame] = useState({
        'rodada_principal': true,
        'rodada_complementar': false,
        'final_rodada': false
    });

    useEffect(() => {
        iniciarGame();
    }, []);

    useEffect(() => {
        if (game.final_rodada) {
            let finalJogo = false;

            if (finalJogo) {
                //validar vencedor
            } else {
                finalizarRodada();
            }
        }
    }, [game])

    const iniciarGame = () => {
        let jogadores = buscarJogadores(3);
        let cartas = cartasData;
        let consumiveis = consumiveisData;

        cartas = game_functions.embaralharCartas(cartas);
        consumiveis = game_functions.embaralharConsumiveis(consumiveis);

        jogadores.forEach((jogador) => {
            jogador = game_functions.comprarCartas(jogador, cartas, 1);
            jogador = game_functions.comprarConsumiveis(jogador, consumiveis, 2);
        });
        
        setCartas(cartas);
        setConsumiveis(consumiveis);
        setJogadores(jogadores);
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
                'jogador_consumivel_escolhido': '',

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

    const listarJogadores = () => {
        let listaJogadores = [...jogadores].map((jogador, index) => {
            return (
                <div className="col" key={ index }>
                    <p>Nome: { jogador.nome }</p>
                    <p>Pontuação: { jogador.pontuacao_atual }</p>
                    <p>Qtde. Cartas: { jogador.mao.cartas.length }</p>
                    <p>Qtde. Consumíveis: { jogador.mao.consumiveis.length }</p>
                </div>
            );
        });

        return listaJogadores;
    }

    const onEscolherCartaChange = (e) => {
        /*let jogadorId = e.target.dataset.jogadorId;
        let cartaId = e.target.value;
        let jogador = [...jogadores].find(jogador => jogador.id == jogadorId);
        let jogadorIndex = [...jogadores].findIndex((jogador) => jogador.id == jogadorId);

        let carta = [...jogador.mao.cartas].find((carta) => carta.id == cartaId);

        jogadores[jogadorIndex].carta_escolhida = carta;

        setJogadores(jogadores);*/
    }

    const onEscolherConsumivelChange = (e) => {
        /*let jogadorId = e.target.dataset.jogadorId;
        let consumivelId = e.target.value;
        let jogador = [...jogadores].find(jogador => jogador.id == jogadorId);
        let jogadorIndex = [...jogadores].findIndex((jogador) => jogador.id == jogadorId);

        let consumivel = [...jogador.mao.consumiveis].find((consumivel) => consumivel.id == consumivelId);

        jogadores[jogadorIndex].consumivel_escolhido = consumivel;

        setJogadores(jogadores);*/
    }

    const onEscolherHabilidadeChange = (e) => {
        let jogadorId = e.target.dataset.jogadorId;
        let cartaId = e.target.dataset.cartaId;
        let habilidadeId = e.target.value;
        let jogador = [...jogadores].find(jogador => jogador.id == jogadorId);
        let jogadorIndex = [...jogadores].findIndex((jogador) => jogador.id == jogadorId);

        let carta = [...jogador.mao.cartas].find((carta) => carta.id == cartaId);
        let habilidade = [...carta.habilidades].find((habilidade) => habilidade.id == habilidadeId);

        jogadores[jogadorIndex].carta_escolhida = carta;
        jogadores[jogadorIndex].habilidade_escolhida = habilidade;

        setJogadores(jogadores);
    }

    const jogarCarta = () => {
        const jogadorAtual = jogadores[jogadorTurnoAtual];

        if (!jogadorAtual.habilidade_escolhida) {
            alert('Necessário Escolher Habilidade!');
            
            return;
        }

        let jogadoresArray = [...jogadores];

        let validarCondicao = game_functions.validarHabilidadeCondicao(jogadorAtual);

        if (!validarCondicao) {
            alert('Habilidade Não Atendida!');

            return;
        }

        let validarHabilidadeEscolherJogador = game_functions.validarHabilidadeEscolherJogador(jogadorAtual);

        if (validarHabilidadeEscolherJogador) {
            jogadorAtual.jogador_escolhido = game_functions.escolherJogador(jogadorAtual, jogadoresArray);

            if (!jogadorAtual.jogador_escolhido || !jogadoresArray.find(jogador => jogador.id == jogadorAtual.jogador_escolhido.id)) {
                alert('Jogador Escolhido Incorretamente!');

                return;
            }

            let validarHabilidadeCondicaoEscolhido = game_functions.validarHabilidadeCondicaoEscolhido(jogadorAtual);

            if (!validarHabilidadeCondicaoEscolhido) {
                alert('Jogador Inválido!');

                return;
            }
        }

        jogadoresArray = game_functions.usarHabilidadeRodadaPrincipal(jogadorAtual, jogadoresArray);

        if (jogadorTurnoAtual + 1 < jogadores.length) {
            setJogadores(jogadoresArray);
            setJogadorTurnoAtual(jogadorTurnoAtual + 1);
        } else {
            jogadoresArray.forEach((jogador) => {
                jogadoresArray = game_functions.usarHabilidadeFinalRodadaPrincipal(jogador, jogadoresArray);
            });

            setJogadores(jogadoresArray);
            setJogadorTurnoAtual(0);
            setGame((prev) => ({...prev, 'rodada_principal': false, 'rodada_complementar': true, 'final_rodada': false}));
        }
    };

    const jogarConsumivel = (e) => {
        const jogadorAtual = jogadores[jogadorTurnoAtual];

        let jogadoresArray = [...jogadores];

        let consumivelId = e.target.dataset.consumivelId;
        let consumivel = jogadorAtual.mao.consumiveis.find((consumivel) => consumivel.id == consumivelId);

        jogadorAtual.consumivel_escolhido = consumivel;

        let validarConsumivelEscolherJogador = game_functions.validarConsumivelEscolherJogador(jogadorAtual);

        if (validarConsumivelEscolherJogador) {
            jogadorAtual.jogador_consumivel_escolhido = game_functions.escolherJogadorConsumivel(jogadorAtual, jogadoresArray);

            if (!jogadorAtual.jogador_consumivel_escolhido || !jogadoresArray.find(jogador => jogador.id == jogadorAtual.jogador_consumivel_escolhido.id)) {
                alert('Jogador Escolhido Incorretamente!');

                return;
            }

            let validarConsumivelJogadorEscolhido = game_functions.validarConsumivelJogadorEscolhido(jogadorAtual);

            if (!validarConsumivelJogadorEscolhido) {
                alert('Jogador Inválido!');

                return;
            }
        }

        jogadoresArray = game_functions.usarConsumivelRodadaComplementar(jogadorAtual, jogadoresArray);

        if (jogadorTurnoAtual + 1 < jogadores.length) {
            setJogadores(jogadoresArray);
            setJogadorTurnoAtual(jogadorTurnoAtual + 1);
        } else {
            jogadoresArray.forEach((jogador) => {
                if (jogador.consumivel_escolhido) {
                    jogadoresArray = game_functions.usarConsumivelFinalRodadaComplementar(jogador, jogadoresArray);
                }
            });

            setJogadores(jogadoresArray);
            setGame((prev) => ({...prev, 'rodada_principal': false, 'rodada_complementar': false, 'final_rodada': true}));
        }
    }

    const pularRodadaComplementar = () => {
        const jogadorAtual = jogadores[jogadorTurnoAtual];

        let jogadoresArray = [...jogadores];

        if (jogadorTurnoAtual + 1 < jogadores.length) {
            setJogadores(jogadoresArray);
            setJogadorTurnoAtual(jogadorTurnoAtual + 1);
        } else {
            jogadoresArray.forEach((jogador) => {
                if (jogador.consumivel_escolhido) {
                    jogadoresArray = game_functions.usarConsumivelFinalRodadaComplementar(jogador, jogadoresArray);
                }
            });

            setGame((prev) => ({...prev, 'rodada_principal': false, 'rodada_complementar': false, 'final_rodada': true}));
        }
    }

    const finalizarRodada = () => {
        let jogadoresArray = [...jogadores];

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
            jogador.jogador_consumivel_escolhido = '';

            jogador.qtde_pontos_perdidos_rodada_principal = 0;
            jogador.qtde_pontos_ganhos_rodada_principal = 0;
            jogador.ganhou_pontos_rodada_principal = false;
            jogador.perdeu_pontos_rodada_principal = false;

            jogador.qtde_pontos_perdidos_rodada_complementar = 0;
            jogador.qtde_pontos_ganhos_rodada_complementar = 0;
            jogador.ganhou_pontos_rodada_complementar = false;
            jogador.perdeu_pontos_rodada_complementar = false;
        });

        setJogadores(jogadoresArray);
        setJogadorTurnoAtual(0);
        setGame((prev) => ({...prev, 'rodada_principal': true, 'rodada_complementar': true, 'final_rodada': false}));
    }

    return (
        <div className="container-fluid">
            <div className="row">
                { listarJogadores() }
            </div>

            <hr />

            { jogadores.length >0 &&
                <Jogador jogador={ jogadores[jogadorTurnoAtual] } jogarCarta={ jogarCarta } jogarConsumivel={ jogarConsumivel }
                    onEscolherCartaChange={ onEscolherCartaChange } onEscolherHabilidadeChange={ onEscolherHabilidadeChange } onEscolherConsumivelChange={ onEscolherConsumivelChange }
                    game={ game } pularRodadaComplementar={ pularRodadaComplementar }
                />
            }
        </div>
    );
}