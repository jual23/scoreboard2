import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'

const Scoreboard = ({matchData, homeRuns, awayRuns}) => {
    return (
        <Grid
            container
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
                            <Card sx={{backgroundColor:"black",color:"red",padding:1}} key={inning.inning}>{inning.runs}</Card>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
            <Grid item container xs={12} alignItems="center">
                <Grid item xs={5}>
                    <p>{matchData.home}</p>
                </Grid>
                <Grid item xs={7}>
                    <Stack                         direction="row"
                        xs={10}
                        alignItems="center"
                        justifyContent="space-around">
                        {homeRuns.map(inning => (
                            <Card sx={{backgroundColor:"black",color:"red",padding:1}} key={inning.inning}>{inning.runs}</Card>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Scoreboard
