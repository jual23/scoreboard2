import React from 'react'
import Card from '@mui/material/Card'

const MatchInfo = ({matchData}) => {
    return (
        <Card>
            <h3>INNING: {matchData.inning}</h3>
            <h3>OUTS: {matchData.outs}</h3>
        </Card>
    )
}

export default MatchInfo
