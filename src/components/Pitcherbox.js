import {Autocomplete, TextField, Grid, Typography} from '@mui/material'
import {useState} from 'react'
import IconButton from '@mui/material/IconButton'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

const Pitcherbox = ({
    awayTeam,
    homeTeam,
    currentPitcher,
    onHandlePitcher,
    matchData,
}) => {
    const [valueD, setValueD] = useState()
    const [inputValueD, setInputValueD] = useState()

    return (
        <div>
            <Typography>Pitcher</Typography>
            {currentPitcher ? (
                <Typography>{currentPitcher.name}</Typography>
            ) : (
                <Typography>Selecciona un pitcher.</Typography>
            )}

            {matchData.bottomHalf === false ? (
                <Grid container>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={valueD}
                            onChange={(event, newValue) => {
                                setValueD(newValue)
                            }}
                            inputValue={inputValueD}
                            onInputChange={(event, newInputValue) => {
                                setInputValueD(newInputValue)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option === value
                            }
                            options={homeTeam}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Pitcher" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton onClick={() => onHandlePitcher(valueD)}>
                            <DoubleArrowIcon
                                color="primary"
                                sx={{fontSize: 40}}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            ) : (
                <Grid container>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={valueD}
                            onChange={(event, newValue) => {
                                setValueD(newValue)
                            }}
                            inputValue={inputValueD}
                            onInputChange={(event, newInputValue) => {
                                setInputValueD(newInputValue)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option === value
                            }
                            options={awayTeam}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Pitcher" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton onClick={() => onHandlePitcher(valueD)}>
                            <DoubleArrowIcon
                                color="primary"
                                sx={{fontSize: 40}}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

export default Pitcherbox
