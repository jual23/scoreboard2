import Card from '@mui/material/Card'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'

const Stats = ({player, active}) => {
    return (
        <Card className={'gender_' + player.gender + ' player-list_stats'}>
            {active && <PlayArrowRoundedIcon />}
            <span>
                <h2>{player.number}</h2>
                <h3>{player.name}</h3>
            </span>
        </Card>
    )
}

export default Stats
