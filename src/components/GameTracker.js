import MatchInfo from './MatchInfo'
import Sideboard from './Sideboard'
import Scoreboard from './Scoreboard'
import Stats from './Stats'
import {Stack} from '@mui/material'

const GameTracker = ({
    awayTeamBatter,
    awayTeam,
    homeTeam,
    homeTeamBatter,
    matchData,
    setMatchData,
    homeRuns,
    awayRuns,
    onHandlePlayer,
    designatedHitter,
}) => {
    return (
        <div className="main">
            <div className="top-row">
                <MatchInfo matchData={matchData} />
                <Scoreboard
                    matchData={matchData}
                    homeRuns={homeRuns}
                    awayRuns={awayRuns}
                />
                <Sideboard
                    matchData={matchData}
                    setMatchData={setMatchData}
                    home={true}
                />
            </div>
            {matchData.bottomHalf === true ? (
                <div>
                    {designatedHitter && (
                        <div onClick={() => onHandlePlayer(designatedHitter)}>
                            <Stats player={designatedHitter} />
                        </div>
                    )}
                    <Stack spacing={2}>
                        {awayTeamBatter.map(player => (
                            <div
                                key={player.id}
                                onClick={() =>
                                    onHandlePlayer(player, awayTeam)
                                }>
                                <Stats player={player} />
                            </div>
                        ))}
                    </Stack>
                    <Stack spacing={2}>
                        {awayTeam.map(player => (
                            <div
                                key={player.id}
                                onClick={() =>
                                    onHandlePlayer(player, awayTeam)
                                }>
                                <Stats player={player} />
                            </div>
                        ))}
                    </Stack>
                </div>
            ) : (
                <div>
                    {designatedHitter && (
                        <div onClick={() => onHandlePlayer(designatedHitter)}>
                            <Stats player={designatedHitter} />
                        </div>
                    )}
                    <Stack spacing={2}>
                        {homeTeamBatter.map(player => (
                            <div
                                key={player.id}
                                onClick={() =>
                                    onHandlePlayer(player, homeTeam)
                                }>
                                <Stats player={player} />
                            </div>
                        ))}
                    </Stack>
                    <Stack spacing={2}>
                        {homeTeam.map(player => (
                            <div
                                key={player.id}
                                onClick={() =>
                                    onHandlePlayer(player, homeTeam)
                                }>
                                <Stats player={player} />
                            </div>
                        ))}
                    </Stack>
                </div>
            )}
        </div>
    )
}

export default GameTracker
