import Carta from "./Carta";
import Consumivel from "./Consumivel";

export default function Jogador({ jogador, jogarCarta, jogarConsumivel, onEscolherCartaChange, onEscolherHabilidadeChange, onEscolherConsumivelChange, game, pularRodadaComplementar }) {
    /*const listarCartas = () => {
        let listaCartas = [...jogador.mao.cartas].map((carta) => {
            return <Carta key={ carta.id } carta={ carta } jogador={ jogador } jogavel={ true } onEscolherCartaChange={ onEscolherCartaChange } onEscolherHabilidadeChange={ onEscolherHabilidadeChange } />
        });

        return (<ul className="list-group list-group-horizontal">{ listaCartas }</ul>);
    }*/

    const listarCartas = () => {
        let listaCartas = [...jogador.mao.cartas].map((carta) => {
            return (<div className="col" key={ carta.id }>
                <Carta key={ carta.id } carta={ carta } jogador={ jogador } jogavel={ true }
                    onEscolherCartaChange={ onEscolherCartaChange } onEscolherHabilidadeChange={ onEscolherHabilidadeChange } jogarCarta={ jogarCarta } game={ game }
                />
            </div>)
        });

        return (<div className="row row-cols-1 row-cols-md-3">{ listaCartas }</div>);
    }
    
    const listarConsumiveis = () => {
        let listaConsumiveis = [...jogador.mao.consumiveis].map((consumivel) => {
            return (<div className="col" key={ consumivel.id }>
                <Consumivel key={ consumivel.id } consumivel={ consumivel } jogador={ jogador } jogavel={ true } onEscolherConsumivelChange={ onEscolherConsumivelChange } jogarConsumivel={ jogarConsumivel } game={ game } />
            </div>)
        });

        return (<div className="row row-cols-1 row-cols-md-3">{ listaConsumiveis }</div>);
    }

    return(
        <>
            <h1>{ jogador.nome }</h1>
            <p>Pontuação: { jogador.pontuacao_atual }</p>

            <h5>Cartas</h5>

            { listarCartas() }

            <h5>Consumíveis</h5>

            { game.rodada_complementar && (
                <button onClick={ pularRodadaComplementar }>Pular</button>
            ) }

            { listarConsumiveis() }

            <h5>Descarte</h5>
        </>
    );
}