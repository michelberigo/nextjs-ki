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

    const [game, setGame] = useState({});

    useEffect(() => {
        iniciarGame();
    }, []);

    useEffect(() => {
        if (game.final_rodada) {
            setTimeout(() => {
                let finalJogo = [...jogadores].every((jogador) => jogador.mao.cartas.length == 0);

                if (finalJogo) {
                    let jogadorVencedor = [...jogadores].reduce((maior, atual) => {
                        return maior.pontuacao_atual > atual.pontuacao_atual ? maior : atual;
                    });

                    let confirmar = confirm(jogadorVencedor.nome + ' é o vencedor! Jogar outra partida?');

                    if (confirmar) {
                        iniciarGame();
                    }
                } else {
                    finalizarRodada();
                }
            }, 0);
        }
    }, [game])

    const iniciarGame = () => {
        let jogadores = buscarJogadores(4);
        let cartas = cartasData;
        let consumiveis = consumiveisData;

        cartas = game_functions.embaralharCartas(cartas);
        consumiveis = game_functions.embaralharConsumiveis(consumiveis);

        jogadores.forEach((jogador) => {
            jogador = game_functions.comprarCartas(jogador, cartas, 1);
            jogador = game_functions.comprarConsumiveis(jogador, consumiveis, 1);
        });
        
        //setCartas(cartas);
        //setConsumiveis(consumiveis);
        setJogadores(jogadores);
        setGame((prev) => ({...prev, 'rodada_principal': true, 'rodada_complementar': false, 'final_rodada': false}));
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
                <div key={ jogador.id } className="flex-fill border w-100 px-2">
                    <h5>{ jogador.nome }</h5>

                    <div className="row">
                        <div className="col-sm-6">
                            <div>Pontos: { jogador.pontuacao_atual }</div>
                            <div>Qtde. Cartas: { jogador.mao.cartas.length }</div>
                            <div>Qtde. Consumíveis: { jogador.mao.consumiveis.length }</div>
                        </div>

                        <div className="col-sm-6">
                            <div>Qtde. Pontos Ganhos R.P.: { jogador.qtde_pontos_ganhos_rodada_principal }</div>
                            <div>Qtde. Pontos Perdidos R.P.: { jogador.qtde_pontos_perdidos_rodada_principal }</div>
                            <div>Qtde. Pontos Ganhos R.C.: { jogador.qtde_pontos_ganhos_rodada_complementar }</div>
                            <div>Qtde. Pontos Perdidos R.C.: { jogador.qtde_pontos_perdidos_rodada_complementar }</div>
                        </div>
                    </div>

                    <div className="row">
                        { jogador.carta_escolhida && <>
                            <div>Última Carta: { jogador.carta_escolhida.nome }</div>
                            <div>Habilidade: { jogador.habilidade_escolhida.numero } - { jogador.habilidade_escolhida.descricao }</div>
                            <div>Jogador Escolhido: { jogador.jogador_escolhido && jogador.jogador_escolhido.nome }</div>
                        </> }
                    </div>
                </div>
            );
        });

        return (<div className="d-flex text-center">{ listaJogadores }</div>);
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

        jogadorAtual.cartas_descartadas.push(jogadorAtual.carta_escolhida);
        jogadorAtual.mao.cartas = jogadorAtual.mao.cartas.filter((carta) => carta.id != jogadorAtual.carta_escolhida.id);

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

        jogadorAtual.consumiveis_descartados.push(jogadorAtual.consumivel_escolhido);
        jogadorAtual.mao.consumiveis = jogadorAtual.mao.consumiveis.filter((consumivel) => consumivel.id != jogadorAtual.consumivel_escolhido.id);

        if (jogadorTurnoAtual + 1 < jogadores.length) {
            setJogadores(jogadoresArray);
            setJogadorTurnoAtual(jogadorTurnoAtual + 1);
        } else {
            jogadoresArray.forEach((jogador) => {
                jogadoresArray = game_functions.usarHabilidadeFinalRodadaComplementar(jogador, jogadoresArray);
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
                jogadoresArray = game_functions.usarHabilidadeFinalRodadaComplementar(jogador, jogadoresArray);
            });

            setJogadores(jogadoresArray);
            setGame((prev) => ({...prev, 'rodada_principal': false, 'rodada_complementar': false, 'final_rodada': true}));
        }
    }

    const finalizarRodada = () => {
        let jogadoresArray = [...jogadores];

        jogadoresArray.forEach((jogador, index) => {
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

            { jogadores.length >0 &&
                <Jogador jogador={ jogadores[jogadorTurnoAtual] } jogarCarta={ jogarCarta } jogarConsumivel={ jogarConsumivel }
                    onEscolherCartaChange={ onEscolherCartaChange } onEscolherHabilidadeChange={ onEscolherHabilidadeChange } onEscolherConsumivelChange={ onEscolherConsumivelChange }
                    game={ game } pularRodadaComplementar={ pularRodadaComplementar }
                />
            }
        </div>
    );
}