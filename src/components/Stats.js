const Stats = ({player}) => {
    return (
        <div className={'gender_' + player.gender + ' player-list_stats'}>
            <h2>{player.number}</h2>
            <h3>{player.name}</h3>
        </div>
    )
}

export default Stats
