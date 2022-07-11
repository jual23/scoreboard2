import StatChanger from './StatChanger'
import {Autocomplete, TextField, Stack, Grid} from '@mui/material'
import {useState} from 'react'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import IconButton from '@mui/material/IconButton'

const ModalStats = ({
    player,
    reserve,
    statDown,
    statUp,
    onHandleDesignatedHitter,
}) => {
    const [valueD, setValueD] = useState()
    const [inputValueD, setInputValueD] = useState()
    const [valueK, setValueK] = useState()
    const [inputValueK, setInputValueK] = useState()
    const [valueO, setValueO] = useState()
    const [inputValueO, setInputValueO] = useState()
    return (
        <Grid
            container
            sx={{
                backgroundColor: 'white',
                width: '80%',
                padding: '20px 0',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            justifyContent="center">
            <Grid item xs={10}>
                <h3>{player.name}</h3>
            </Grid>
            <Grid item xs={10}>
                <Stack direction="row" justifyContent="center">
                    <StatChanger
                        stat={player.hit}
                        statText="hit"
                        keyword="H"
                        statDown={statDown}
                        statUp={statUp}
                        player={player}
                    />
                    <StatChanger
                        stat={player.double}
                        statText="double"
                        keyword="2B"
                        statDown={statDown}
                        statUp={statUp}
                        player={player}
                    />
                    <StatChanger
                        stat={player.triple}
                        statText="triple"
                        keyword="3B"
                        statDown={statDown}
                        statUp={statUp}
                        player={player}
                    />
                    <StatChanger
                        stat={player.run}
                        statText="run"
                        keyword="R"
                        statDown={statDown}
                        statUp={statUp}
                        player={player}
                    />
                    <StatChanger
                        stat={player.homerun}
                        statText="homerun"
                        keyword="HR"
                        statDown={statDown}
                        statUp={statUp}
                        player={player}
                    />
                </Stack>
            </Grid>
            <Grid item container xs={10} justifyContent="center" rowSpacing={3}>
                <Grid item container xs={8} justifyContent="center">
                    <Grid item xs={10}>
                        <Autocomplete
                            value={valueK}
                            onChange={(event, newValue) => {
                                setValueK(newValue)
                            }}
                            inputValue={inputValueK}
                            onInputChange={(event, newInputValue) => {
                                setInputValueK(newInputValue)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option === value
                            }
                            options={opponentReserve}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Strikeout" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            onClick={() => statUp(valueK, 'strikeout', true)}>
                            {player.strikeout}
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container xs={8} justifyContent="center">
                    <Grid xs={10}>
                        <Autocomplete
                            value={valueO}
                            onChange={(event, newValue) => {
                                setValueO(newValue)
                            }}
                            inputValue={inputValueO}
                            onInputChange={(event, newInputValue) => {
                                setInputValueO(newInputValue)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option === value
                            }
                            options={opponentReserve}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Out" />
                            )}
                        />
                    </Grid>
                    <Grid xs={2}>
                        <IconButton onClick={() => statUp(valueO, 'out', true)}>
                            {player.out}
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container xs={8} justifyContent="center">
                    <Grid item xs={10}>
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
                            options={reserve}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Emergente" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            onClick={() => onHandleDesignatedHitter(valueD)}>
                            <DoubleArrowIcon
                                color="success"
                                sx={{fontSize: 40}}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ModalStats
