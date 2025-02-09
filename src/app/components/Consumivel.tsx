export default function Consumivel({ consumivel, jogador, jogavel, jogarConsumivel, game }) {
    return (
        <div className="col">
            <div className="card h-100 w-100">
                <div className="card-body">
                    <p className="card-text" style={{ 'fontSize': '14px' }}>{ consumivel.descricao }</p>
                </div>
                
                <div className="card-footer">
                    { game.rodada_complementar && (
                        <div className="text-center">
                            <button onClick={ jogarConsumivel } data-consumivel-id={ consumivel.id }>Jogar</button>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    );
}