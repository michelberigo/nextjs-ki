import Carta from "./Carta";
import Consumivel from "./Consumivel";

export default function Jogador({ jogador, onEscolherCartaChange, onEscolherHabilidadeChange, onEscolherConsumivelChange }) {
    const listarCartas = () => {
        let listaCartas = [...jogador.mao.cartas].map((carta) => {
            return <Carta key={ carta.id } carta={ carta } jogador={ jogador } jogavel={ true } onEscolherCartaChange={ onEscolherCartaChange } onEscolherHabilidadeChange={ onEscolherHabilidadeChange } />
        });

        return (<ul className="list-group list-group-horizontal">{ listaCartas }</ul>);
    }

    const listarConsumiveis = () => {
        let listaConsumiveis = [...jogador.mao.consumiveis].map((consumivel) => {
            return <Consumivel key={ consumivel.id } consumivel={ consumivel } jogador={ jogador } jogavel={ true } onEscolherConsumivelChange={ onEscolherConsumivelChange } />
        });

        return (<ul className="list-group list-group-horizontal">{ listaConsumiveis }</ul>);
    }

    const listarCartasDescartas = () => {
        let listaCartas = [...jogador.cartas_descartadas].map((carta) => {
            return <Carta key={ carta.id } carta={ carta } jogador={ jogador } jogavel={ false } onEscolherCartaChange={ onEscolherCartaChange } onEscolherHabilidadeChange={ onEscolherHabilidadeChange } />
        });

        return (<ul>{ listaCartas }</ul>);
    }



    return (
        <div>
            <h3>{ jogador.nome } - Pontuação: { jogador.pontuacao_atual }</h3>

            <h5>Cartas</h5>

            { listarCartas() }

            <h5>Consumíveis</h5>

            { listarConsumiveis() }

            <h5>Descarte</h5>

            { listarCartasDescartas() }
        </div>
    );
}