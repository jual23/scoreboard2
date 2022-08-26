import axios from 'axios'
import {
    Grid,
    Box,
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
        <Grid container justifyContent="space-evenly" >
            {leagues.map(league => (
                <Grid item xs={6} key={league.id}>
                    <Button onClick={() => getMatches(league.id)}>
                    <Grid container ><Grid item xs={12}><Card sx={{backgroundPosition:"center",backgroundImage: `url("https://media.istockphoto.com/photos/universal-grass-stadium-illuminated-by-spotlights-and-empty-green-picture-id1130905980?k=20&m=1130905980&s=612x612&w=0&h=jnoRR6ZEK1fT1dkx-yaZQxjTE59n5CUC2zbTFQ-5hWA=")`}}>
                            
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={
                                            league.attributes.logo.data
                                                .attributes.url
                                        }
                                        alt="logo"
                                        className='glassmorph'
                                    />

                                {/* <Grid item xs={8}>
                                    <CardContent>
                                        <Typography
                                            component="div"
                                            variant="h5">
                                            {league.attributes.name}
                                        </Typography>
                                    </CardContent>
                                </Grid> */}

                        </Card></Grid></Grid>
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default LeagueSelect
