import MatchInfo from './MatchInfo'
import Sideboard from './Sideboard'
import Scoreboard from './Scoreboard'
import Stats from './Stats'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'

const GameTracker = ({
    awayTeam,
    awayBatter,
    awayReserve,
    homeTeam,
    homeBatter,
    homeReserve,
    matchData,
    setMatchData,
    homeRuns,
    awayRuns,
    onHandlePlayer,
    save
}) => {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container className="main" spacing={3}>
                <Grid item container xs={12} justifyContent="space-evenly" alignItems='center'>
                    <Grid item xs={4}>
                        <MatchInfo matchData={matchData} />
                    </Grid>
                    <Grid item xs={4} >
                        <Button variant='contained' color="secondary" onClick={() => save()}>Guardar Stats</Button>
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
                            {homeBatter.map(player => (
                                <Grid
                                    key={player.id}
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, homeTeam, awayTeam)
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
                            {homeReserve.map(player => (
                                <Grid
                                key={player.id}
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, homeTeam, awayTeam)
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
                            {awayBatter.map(player => (
                                <Grid
                                key={player.id}
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, awayTeam, homeTeam)
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
                            {awayReserve.map(player => (
                                <Grid
                                key={player.id}
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(player, awayTeam, homeTeam)
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
