import MatchInfo from './MatchInfo'
import Sideboard from './Sideboard'
import Scoreboard from './Scoreboard'
import Stats from './Stats'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

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
        <Box sx={{flexGrow: 1}}>
            <Grid container className="main" spacing={3}>
                <Grid item container xs={12} justifyContent="center">
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
                    <Grid item xs={11} justifyContent="center">
                        <Sideboard
                            matchData={matchData}
                            setMatchData={setMatchData}
                            home={true}
                        />
                    </Grid>
                </Grid>
                {matchData.bottomHalf === true ? (
                    <Grid item container justifyContent="space-around" xs={12}>
                        <Grid
                            item
                            xs={11}
                            container
                            justifyContent="space-around"
                            rowSpacing={2}
                            sx={{
                                marginTop: 1,
                                backgroundColor: 'aliceblue',
                                paddingBottom: 3,
                                borderRadius: 1,
                            }}>
                            {/* {designatedHitter && (
                                <Grid
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(designatedHitter)
                                    }>
                                    <Stats player={designatedHitter} />
                                </Grid>
                            )} */}
                            {homeTeamBatter.map(player => (
                                <Grid
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, awayTeam)
                                    }>
                                    <Stats player={player} />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid
                            item
                            xs={11}
                            container
                            justifyContent="space-around"
                            rowSpacing={2}
                            sx={{
                                marginTop: 1,
                                backgroundColor: 'aliceblue',
                                paddingBottom: 3,
                                borderRadius: 1,
                            }}>
                            {homeTeam.map(player => (
                                <Grid
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, awayTeam)
                                    }>
                                    <Stats player={player} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ) : (
                    <Grid
                        item
                        container
                        justifyContent="space-around"
                        rowSpacing={1}>
                        <Grid
                            container
                            item
                            rowSpacing={2}
                            xs={11}
                            justifyContent="space-around"
                            sx={{
                                marginTop: 1,
                                backgroundColor: 'aliceblue',
                                paddingBottom: 3,
                                borderRadius: 1,
                            }}>
                            {/* {designatedHitter && (
                                <Grid
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(designatedHitter)
                                    }>
                                    <Stats player={designatedHitter} />
                                </Grid>
                            )} */}
                            {awayTeamBatter.map(player => (
                                <Grid
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, homeTeam)
                                    }>
                                    <Stats player={player} />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid
                            container
                            item
                            rowSpacing={2}
                            xs={11}
                            justifyContent="space-around"
                            sx={{
                                marginTop: 1,
                                backgroundColor: 'aliceblue',
                                paddingBottom: 3,
                                borderRadius: 1,
                            }}>
                            {awayTeam.map(player => (
                                <Grid
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, homeTeam)
                                    }>
                                    <Stats player={player} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default GameTracker
