import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
const Scoreboard = ({matchData, homeRuns, awayRuns}) => {
    return (
        <Grid
            container
            xs={11}
            alignItems="center"
            className="scoreboard-container">
            <Grid item container xs={12} alignItems="center">
                <Grid item xs={5}>
                    <p>{matchData.away}</p>
                </Grid>
                <Grid item xs={7}>
                    <Stack
                        direction="row"
                        xs={10}
                        alignItems="center"
                        justifyContent="space-around">
                        {awayRuns.map(inning => (
                            <p key={inning.inning}>{inning.runs}</p>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
            <Grid item container xs={12} alignItems="center">
                <Grid item xs={5}>
                    <p>{matchData.home}</p>
                </Grid>
                <Grid item xs={7}>
                    <Stack direction="row" xs={10} alignItems="center">
                        {homeRuns.map(inning => (
                            <p key={inning.inning}>{inning.runs}</p>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Scoreboard
