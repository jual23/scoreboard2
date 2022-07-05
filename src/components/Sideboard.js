import React from 'react'
import Dialog from '@mui/material/Dialog'
import {useState} from 'react'

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
        <div className="sideboard">
            <div>
                <button type="button" onClick={() => handleOpenTimeout(0)}>
                    Timeouts: {matchData.awayTimeout}
                </button>
                <button type="button" onClick={() => handleOpenChallenge(0)}>
                    Challenge: {matchData.awayChallenge}
                </button>
            </div>
            <div>
                <button type="button" onClick={() => handleOpenTimeout(1)}>
                    Timeouts: {matchData.homeTimeout}
                </button>
                <button type="button" onClick={() => handleOpenChallenge(1)}>
                    Challenge: {matchData.homeChallenge}
                </button>
            </div>
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
        </div>
    )
}
export default Sideboard
