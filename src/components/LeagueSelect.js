import axios from 'axios'
import {
    Grid,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material'

const LeagueSelect = ({leagues, setMatchList, navigate}) => {
    const getMatches = leagueId => {
        axios
            .get(
                `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/games?fields[0]=date&fields[1]=time&fields[2]=round&populate[team_a][fields][0]=name&populate[team_a][populate][logo][fields][0]=url&populate[team_b][fields][0]=name&populate[team_b][populate][logo][fields][0]=url&filters[completed][$eq]=false&filters[league][id][$eq]=${leagueId}`
            )
            .then(response => {
                setMatchList(response.data.data)
                navigate('/match-select')
            })
    }
    return (
        <Grid container justifyContent="space-evenly" spacing={3}>
            {leagues.map(league => (
                <Grid item xs={9} key={league.id}>
                    <Button onClick={() => getMatches(league.id)}>
                        <Card>
                            <Grid container>
                                <Grid item xs={12}>
                                    <CardMedia
                                        component="img"
                                        height="120"
                                        image="https://www.freewebheaders.com/wp-content/gallery/football/sports-soccer-stadium-night-scene-web-header.jpg"
                                        alt="logo"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CardMedia
                                        component="img"
                                        height="120"
                                        image={
                                            league.attributes.logo.data
                                                .attributes.url
                                        }
                                        alt="logo"
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <CardContent>
                                        <Typography
                                            component="div"
                                            variant="h5">
                                            {league.attributes.name}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default LeagueSelect
