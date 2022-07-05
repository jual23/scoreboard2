import React from 'react'

const MatchInfo = ({matchData}) => {
    return (
        <div>
            <div className="scoreboard-container_game-stat">
                <h3>INNING</h3>
                <p>{matchData.inning}</p>
            </div>
            <div className="scoreboard-container_game-stat">
                <h3>OUT</h3>
                <p>{matchData.outs}</p>
            </div>
        </div>
    )
}

export default MatchInfo
