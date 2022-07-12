import SortableList from './SortableList'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import Grid from '@mui/material/Grid'

const TeamSetup = ({
    teamNameHome,
    homeReserve,
    homeBatter,
    updateHomeTeam,
    teamNameAway,
    awayReserve,
    awayBatter,
    updateAwayTeam,
}) => {
    const [home, setHome] = useState(true)
    let navigate = useNavigate()
    return (
        <>
            <Grid container justifyContent="space-around" rowSpacing={1}>
                <Grid item xs={12}>
                    <Card>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-around">
                            <Grid item xs={6}>
                                {home === true ? (
                                    <h2>{teamNameHome}</h2>
                                ) : (
                                    <h2>{teamNameAway}</h2>
                                )}
                            </Grid>
                            <Grid item xs={2}>
                                <button
                                    onClick={() => setHome(!home)}
                                    className="primaryButton">
                                    <SwapHorizIcon fontSize="medium" />
                                </button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            {home && (
                <SortableList
                    updateTeam={updateHomeTeam}
                    teamReserve={homeReserve}
                    teamBatter={homeBatter}
                    teamId={'home'}
                    teamName={teamNameHome}
                />
            )}
            {!home && (
                <SortableList
                    updateTeam={updateAwayTeam}
                    teamReserve={awayReserve}
                    teamBatter={awayBatter}
                    teamId={'away'}
                    teamName={teamNameAway}
                />
            )}
            <Grid container justifyContent="space-around">
                <Grid item>
                    <button
                        className="primaryButton"
                        onClick={() => navigate('/tracker')}>
                        CONTINUAR
                    </button>
                </Grid>
            </Grid>
        </>
    )
}

export default TeamSetup
