import {Grid, Typography, Button, Card, CardContent} from '@mui/material'

const MatchSelect = ({matchData, setMatchData, matchList, submitTeams}) => {
    const setupMatch = (home, homeId, away, awayId, matchId) => {
        setMatchData({
            ...matchData,
            home: home,
            homeId: homeId,
            away: away,
            awayId: awayId,
            id: matchId,
        })
        submitTeams()
    }

    return (
        <Grid container spacing={3} justifyContent="space-around">
            {matchList.map(match => (
                <Grid item xs={10} key={match.id}>
                    <Button
                        onClick={() =>
                            setupMatch(
                                match.attributes.team_a.data.attributes.name,
                                match.attributes.team_a.data.id,
                                match.attributes.team_b.data.attributes.name,
                                match.attributes.team_b.data.id,
                                match.id
                            )
                        }>
                        <Card sx={{backgroundColor: 'white'}}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Typography>
                                            {
                                                match.attributes.team_a.data
                                                    .attributes.name
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>VS</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography>
                                            {
                                                match.attributes.team_b.data
                                                    .attributes.name
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12}>
                                        <Typography>
                                            {match.attributes.date}
                                        </Typography>
                                        <Typography>
                                            {match.attributes.time}
                                        </Typography>
                                        <Typography>
                                            {match.attributes.round}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default MatchSelect
