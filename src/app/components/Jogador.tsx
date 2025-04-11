import Carta from "./Carta";
import Consumivel from "./Consumivel";

export default function Jogador({ jogador, jogarCarta, jogarConsumivel, onEscolherHabilidadeChange, game, pularRodadaComplementar }) {
    const listarCartas = () => {
        let listaCartas = [...jogador.mao.cartas].map((carta) => {
            return (<div className="col" key={ carta.id }>
                <Carta key={ carta.id } carta={ carta } jogador={ jogador } jogavel={ true }
                    onEscolherHabilidadeChange={ onEscolherHabilidadeChange } jogarCarta={ jogarCarta } game={ game }
                />
            </div>)
        });

        return (<div className="row">{ listaCartas }</div>);
    }
    
    const listarConsumiveis = () => {
        let listaConsumiveis = [...jogador.mao.consumiveis].map((consumivel) => {
            return (<div className="col" key={ consumivel.id }>
                <Consumivel key={ consumivel.id } consumivel={ consumivel } jogador={ jogador } jogavel={ true } jogarConsumivel={ jogarConsumivel } game={ game } />
            </div>)
        });

        return (<div className="row row-cols-1 row-cols-md-2">{ listaConsumiveis }</div>);
    }

    return(
        <>
            <h1>{ jogador.nome }</h1>

            <div className="row">
                <div className="col-sm-9">
                    <h5>Cartas</h5>

                    { listarCartas() }
                </div>

                <div className="col-sm-3">
                    <h5>Consumíveis</h5>

                    { game.rodada_complementar && (
                        <button onClick={ pularRodadaComplementar }>Pular</button>
                    ) }

                    { listarConsumiveis() }
                </div>
            </div>

            <h5>Descarte</h5>
        </>
    );
}