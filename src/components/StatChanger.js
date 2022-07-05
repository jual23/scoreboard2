const StatChanger = ({stat, statText, keyword, player, statUp, statDown}) => {
    return (
        <li>
            <h3>{keyword}</h3>
            <button onClick={() => statUp(player, statText)}>+</button>
            <p>{stat}</p>
            <button onClick={() => statDown(player, statText)}>-</button>
        </li>
    )
}

export default StatChanger
