import Card from '@mui/material/Card';

const Stats = ({player}) => {
    return (
        <Card className={'gender_' + player.gender + ' player-list_stats'}>
            <h2>{player.number}</h2>
            <h3>{player.name}</h3>
        </Card>
    )
}

export default Stats
