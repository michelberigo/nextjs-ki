export default function Carta({ carta, jogador, jogavel, onEscolherCartaChange, onEscolherHabilidadeChange }) {
    return (
        <li key={ carta.id } className="list-group-item">
            { jogavel && <input type="radio" name={ 'jogador_' + jogador.id + '_carta_id' } value={ carta.id } data-jogador-id={ jogador.id } onChange={ onEscolherCartaChange } /> }

            { carta.nome }

            { jogavel && <div>
                <p>Habilidades</p>

                <ul>
                    { carta.habilidades.map((habilidade) => {
                        return (
                            <li key={ habilidade.id }>
                                <input type="radio" name={ 'jogador_' + jogador.id + '_habilidade_id' } value={ habilidade.id } data-jogador-id={ jogador.id } data-carta-id={ carta.id } onChange={ onEscolherHabilidadeChange } />

                                { habilidade.descricao }
                            </li>
                        )
                    }) }
                </ul>
            </div> }
        </li>
    );
}