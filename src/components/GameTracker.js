import MatchInfo from './MatchInfo'
import Sideboard from './Sideboard'
import Scoreboard from './Scoreboard'
import Stats from './Stats'
import Grid from '@mui/material/Grid'

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
        <Grid container className="main" rowSpacing={2}>
            <Grid item container className="top-row" xs={12}>
                <Grid item xs={10}>
                    <MatchInfo matchData={matchData} />
                </Grid>
                <Grid item xs={12}>
                    <Scoreboard
                    matchData={matchData}
                    homeRuns={homeRuns}
                    awayRuns={awayRuns}
                    />
                </Grid>
                <Grid item  >
                    <Sideboard
                    matchData={matchData}
                    setMatchData={setMatchData}
                    home={true}
                    />
                </Grid>
            </Grid>
            {matchData.bottomHalf === true ? (
                <Grid item container justifyContent='space-around' xs={12}>
                    <Grid container justifyContent='space-around' rowSpacing={2}>
                        {designatedHitter && (
                            <Grid item xs={10} onClick={() => onHandlePlayer(designatedHitter)}>
                                <Stats player={designatedHitter} />
                            </Grid>
                        )}
                            {awayTeamBatter.map(player => (
                                <Grid item xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, awayTeam)
                                    }>
                                    <Stats player={player} />
                                </Grid>
                            ))}
                    </Grid>
                    <Grid container justifyContent='space-around' rowSpacing={2}>
                            {awayTeam.map(player => (
                                <Grid item xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, awayTeam)
                                    }>
                                    <Stats player={player} />
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            ) : (
                <Grid item container justifyContent='space-around' rowSpacing={5}>
                        <Grid container justifyContent='space-around' rowSpacing={2}  sx={{ marginTop: 1}}>
                        
                            {designatedHitter && (
                                <Grid item xs={10} onClick={() => onHandlePlayer(designatedHitter)}>
                                    <Stats player={designatedHitter} />
                                </Grid>
                            )}
                                {homeTeamBatter.map(player => (
                                    <Grid item xs={10}
                                        onClick={() =>
                                            onHandlePlayer(player, awayTeam)
                                        }>
                                        <Stats player={player} />
                                    </Grid>
                                ))}
                        </Grid>
                        <Grid container justifyContent='space-around' xs={11} rowSpacing={2} sx={{ marginTop: 1}}>
                            {homeTeam.map(player => (
                                    <Grid item xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, awayTeam)
                                    }>
                                    <Stats player={player} />
                                </Grid>
                            ))}
                        </Grid>
                </Grid>
            )}
        </Grid>
    )
}

export default GameTracker
