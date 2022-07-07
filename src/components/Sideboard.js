import React from 'react'
import Dialog from '@mui/material/Dialog'
import {useState} from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';

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
    }

    return (
        
        <Grid container justifyContent="space-around">
            <Grid item xs={5} >
                <Card>
                    <Grid container justifyContent="center">
                        <Grid item xs={10}>
                            <button className='primaryButton' onClick={() => handleOpenTimeout(0)}>
                                Timeouts: {matchData.awayTimeout}
                            </button>
                        </Grid>
                        <Grid item xs={10}>
                            <button className='primaryButton' onClick={() => handleOpenChallenge(0)}>
                                Challenge: {matchData.awayChallenge}
                            </button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid  item xs={5} >
                <Card>
                    <Grid container justifyContent="center">
                        <Grid item xs={10}>
                            <button className='primaryButton' onClick={() => handleOpenTimeout(0)}>
                                Timeouts: {matchData.homeTimeout}
                            </button>
                        </Grid>
                        <Grid item xs={10}>
                            <button className='primaryButton' onClick={() => handleOpenChallenge(0)}>
                                Challenge: {matchData.homeChallenge}
                            </button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Dialog onClose={() => setOpenTimeout(false)} open={openTimeout}>
                <div>
                    <h3>¿Desea llamar un timeout?</h3>
                    <button onClick={() => timeoutConfirm(team)}> Si</button>
                    <button onClick={() => timeoutConfirm(team)}> No</button>
                </div>
            </Dialog>
            <Dialog
                onClose={() => setOpenChallenge(false)}
                open={openChallenge}>
                <h3>¿Se acepta el challenge?</h3>
                <button onClick={() => challengeWin(team)}> Si</button>
                <button onClick={() => challengeLose(team)}> No</button>
            </Dialog>
        </Grid>
    )
}
export default Sideboard
