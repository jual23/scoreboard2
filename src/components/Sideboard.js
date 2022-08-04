import React from 'react'
import Dialog from '@mui/material/Dialog'
import {useState} from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Sideboard = ({matchData, setMatchData}) => {
    const [openTimeout, setOpenTimeout] = useState(false)
    const [openChallenge, setOpenChallenge] = useState(false)
    const [team, setTeam] = useState()
    const handleOpenTimeout = id => {
        setTeam(id)
        id === 0
            ? matchData.awayTimeout === 0
                ? alert('No quedan timeout')
                : setOpenTimeout(true)
            : matchData.homeTimeout === 0
            ? alert('No quedan timeout')
            : setOpenTimeout(true)
    }

    const handleOpenChallenge = id => {
        setTeam(id)
        id === 0
            ? matchData.awayChallenge === 0
                ? alert('No quedan challenge')
                : matchData.awayTimeout === 0
                ? alert('No quedan timeout')
                : setOpenChallenge(true)
            : matchData.homeChallenge === 0
            ? alert('No quedan challenge')
            : matchData.homeTimeout === 0
            ? alert('No quedan timeout')
            : setOpenChallenge(true)
    }

    const challengeWin = team => {
        team === 1
            ? setMatchData({
                  ...matchData,
                  homeChallenge: matchData.homeChallenge - 1,
              })
            : setMatchData({
                  ...matchData,
                  awayChallenge: matchData.awayChallenge - 1,
              })
        setOpenChallenge(false)
    }
    const challengeLose = team => {
        team === 1
            ? setMatchData({
                  ...matchData,
                  homeChallenge: matchData.homeChallenge - 1,
                  homeTimeout: matchData.homeTimeout - 1,
              })
            : setMatchData({
                  ...matchData,
                  awayChallenge: matchData.awayChallenge - 1,
                  awayTimeout: matchData.awayTimeout - 1,
              })
        setOpenChallenge(false)
    }
    const timeoutConfirm = team => {
        team === 1
            ? setMatchData({
                  ...matchData,
                  homeTimeout: matchData.homeTimeout - 1,
              })
            : setMatchData({
                  ...matchData,
                  awayTimeout: matchData.awayTimeout - 1,
              })
        setOpenTimeout(false)
    }

    return (
        <Grid container justifyContent="space-around">
            <Grid item xs={5}>
                <Card>
                    
                    <Grid container justifyContent="center">
                    <Grid container item xs={10} sx={{textAlign:'center'}}><h2>{matchData.away}</h2></Grid>
                        <Grid item xs={10}>
                            <button
                                className="primaryButton"
                                onClick={() => handleOpenTimeout(0)}>
                                Timeouts: {matchData.awayTimeout}
                            </button>
                        </Grid>
                        <Grid item xs={10}>
                            <button
                                className="primaryButton"
                                onClick={() => handleOpenChallenge(0)}>
                                Challenge: {matchData.awayChallenge}
                            </button>
                        </Grid>
                        <Grid item xs={10}>
                            <button
                                className="primaryButton">
                                Emergente: {matchData.awayDesignated}
                            </button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={5}>
                <Card>
                
                    <Grid container justifyContent="center">
                    <Grid item xs={10} sx={{textAlign:'center'}}><h2>{matchData.home}</h2></Grid>
                        <Grid item xs={10}>
                            <button
                                className="primaryButton"
                                onClick={() => handleOpenTimeout(1)}>
                                Timeouts: {matchData.homeTimeout}
                            </button>
                        </Grid>
                        <Grid item xs={10}>
                            <button
                                className="primaryButton"
                                onClick={() => handleOpenChallenge(1)}>
                                Challenge: {matchData.homeChallenge}
                            </button>
                        </Grid>
                        <Grid item xs={10}>
                            <button
                                className="primaryButton">
                                Emergente: {matchData.homeDesignated}
                            </button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Dialog onClose={() => setOpenTimeout(false)} open={openTimeout} >
                <Box sx={{padding:3}}>
                    <h2>¿Desea llamar un timeout?</h2>
                    <Stack direction="row" justifyContent="space-evenly">
                        <Button variant="contained" color="success" onClick={() => timeoutConfirm(team)}> Si</Button>
                        <Button variant="contained" color="error" onClick={() => setOpenTimeout(false)}> No</Button>
                    </Stack>
                    </Box>
            </Dialog>
            <Dialog
                onClose={() => setOpenChallenge(false)}
                open={openChallenge}>
                    <Box sx={{padding:3}}>
                <h2>¿Se acepta el challenge?</h2>
                <Stack direction="row" justifyContent="space-evenly">
                    <Button variant="contained" color="success" onClick={() => challengeWin(team)}> Si</Button>
                    <Button variant="contained" color="error" onClick={() => challengeLose(team)}> No</Button>
                </Stack>
                </Box>
            </Dialog>
        </Grid>
    )
}
export default Sideboard
