export default function Consumivel({ consumivel, jogador, jogavel, onEscolherConsumivelChange }) {
    return (
        <li key={ consumivel.id } className="list-group-item">
            { jogavel && <input type="radio" name={ 'jogador_' + jogador.id + '_consumivel_id' } value={ consumivel.id } data-jogador-id={ jogador.id } onChange={ onEscolherConsumivelChange } /> }

            { consumivel.descricao }
        </li>
    );
}