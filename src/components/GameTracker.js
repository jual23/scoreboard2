import MatchInfo from './MatchInfo'
import Sideboard from './Sideboard'
import Scoreboard from './Scoreboard'
import Pitcherbox from './Pitcherbox'
import Stats from './Stats'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {Button, Card, CardMedia, CardContent} from '@mui/material'

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
    currentPitcher,
    onHandlePitcher,
    save,
    homeIndex,
    awayIndex,
}) => {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container className="main" spacing={3} justifyContent="center">
                <Grid
                    item
                    container
                    xs={12}
                    justifyContent="space-evenly"
                    alignItems="center">
                    <Grid item xs={4}>
                        <MatchInfo matchData={matchData} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => save()}>
                            Guardar Stats
                        </Button>
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
                <Grid item xs={10} >
                        <Card >
                            <CardContent>
                                <Pitcherbox
                                currentPitcher={currentPitcher}
                                onHandlePitcher={onHandlePitcher}
                                awayTeam={awayTeam}
                                homeTeam={homeTeam}
                                matchData={matchData}
                            />
                            </CardContent>
                        </Card>
                </Grid>
                {matchData.bottomHalf === true ? (
                    currentPitcher && <Grid item container justifyContent="space-around" xs={12}>
                        <Grid item xs={11} justifyContent="center">
                            <h2>{matchData.home}</h2>
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
                            {homeBatter.map(player => (
                                <Grid
                                    key={player.id}
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(
                                            player,
                                            homeTeam,
                                            awayTeam
                                        )
                                    }>
                                    <Stats
                                        player={player}
                                        active={
                                            homeBatter.indexOf(player) ===
                                            homeIndex
                                        }
                                    />
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
                                        onHandlePlayer(
                                            player,
                                            homeTeam,
                                            awayTeam
                                        )
                                    }>
                                    <Stats player={player} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ) : (
                    currentPitcher && <Grid
                        item
                        container
                        justifyContent="space-around"
                        rowSpacing={1}>
                        <Grid item xs={11} justifyContent="center">
                            <h2>{matchData.away}</h2>
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
                            {awayBatter.map(player => (
                                <Grid
                                    key={player.id}
                                    item
                                    xs={10}
                                    onClick={() =>
                                        onHandlePlayer(
                                            player,
                                            awayTeam,
                                            homeTeam
                                        )
                                    }>
                                    <Stats
                                        player={player}
                                        active={
                                            awayBatter.indexOf(player) ===
                                            awayIndex
                                        }
                                    />
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
                                        onHandlePlayer(
                                            player,
                                            awayTeam,
                                            homeTeam
                                        )
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
