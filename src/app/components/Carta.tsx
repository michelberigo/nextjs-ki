export default function Carta({ carta, jogador, jogavel, onEscolherHabilidadeChange, jogarCarta, game }) {
    return (
        <div className="col">
            <div className="card h-100 w-75">
                <div className="card-header">
                    <div className="text-center">
                        <h5><b>{ carta.nome.toUpperCase() }</b></h5>
                    </div>
                </div>
                
                <div className="card-body">
                    <img src={`/lutadores/${carta.slug}.jpg`} className="card-img-top" alt="..." />

                    { carta.habilidades.map((habilidade) => {
                        return (
                            <p key={ habilidade.id } className="card-text" style={{ 'fontSize': '12px' }}>
                                { game.rodada_principal && (
                                    <input type="radio" name={ 'jogador_' + jogador.id + '_habilidade_id' } value={ habilidade.id } data-jogador-id={ jogador.id } data-carta-id={ carta.id } onChange={ onEscolherHabilidadeChange } />
                                ) }
                                
                                { habilidade.descricao }
                            </p>
                        )
                    }) }
                </div>
                
                <div className="card-footer">
                    { game.rodada_principal && (
                        <div className="text-center">
                            <button onClick={ jogarCarta }>Jogar</button>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    );
}