import SortableList from './SortableList'
import {useEffect} from 'react'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const TeamSetup = ({
    teamNameHome,
    homeTeam,
    homeTeamBatter,
    updateHomeTeam,
    teamNameAway,
    awayTeam,
    awayTeamBatter,
    updateAwayTeam,
}) => {
    const [team, setTeam] = useState(true)
    let navigate = useNavigate()
    return (
        <div className="setup">
            <button onClick={() => setTeam(!team)} className="primary-button">
                <SwapHorizIcon />
            </button>
            <div>
                {team && (
                    <SortableList
                        updateTeam={updateHomeTeam}
                        team={homeTeam}
                        teamBatter={homeTeamBatter}
                        teamId={'home'}
                        teamName={teamNameHome}
                        onHandlePlayer={null}
                    />
                )}
                {!team && (
                    <SortableList
                        updateTeam={updateAwayTeam}
                        team={awayTeam}
                        teamBatter={awayTeamBatter}
                        teamId={'away'}
                        teamName={teamNameAway}
                        onHandlePlayer={null}
                    />
                )}
            </div>
            <div>
                <button onClick={() => navigate('/tracker')}>CONTINUAR</button>
            </div>
        </div>
    )
}

export default TeamSetup
