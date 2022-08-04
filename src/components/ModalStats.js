import StatChanger from './StatChanger'
import {Autocomplete, TextField, Stack, Grid} from '@mui/material'
import {useState} from 'react'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

const ModalStats = ({
    currentPlayer,
    batterList,
    fieldList,
    statDown,
    statUp,
    onHandleDesignatedHitter,
}) => {
    const [valueD, setValueD] = useState()
    const [inputValueD, setInputValueD] = useState()
    const [valueE, setValueE] = useState()
    const [inputValueE, setInputValueE] = useState()
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
                <h3>{currentPlayer.name}</h3>
            </Grid>
            <Grid item xs={10}>
                <Stack direction="row" justifyContent="center">
                    <StatChanger
                        stat={currentPlayer.hit}
                        statText="hit"
                        keyword="H"
                        statDown={statDown}
                        statUp={statUp}
                        currentPlayer={currentPlayer}
                    />
                    <StatChanger
                        stat={currentPlayer.double}
                        statText="double"
                        keyword="2B"
                        statDown={statDown}
                        statUp={statUp}
                        currentPlayer={currentPlayer}
                    />
                    <StatChanger
                        stat={currentPlayer.triple}
                        statText="triple"
                        keyword="3B"
                        statDown={statDown}
                        statUp={statUp}
                        currentPlayer={currentPlayer}
                    />
                    <StatChanger
                        stat={currentPlayer.run}
                        statText="run"
                        keyword="R"
                        statDown={statDown}
                        statUp={statUp}
                        currentPlayer={currentPlayer}
                    />
                    <StatChanger
                        stat={currentPlayer.homerun}
                        statText="homerun"
                        keyword="HR"
                        statDown={statDown}
                        statUp={statUp}
                        currentPlayer={currentPlayer}
                    />
                </Stack>
            </Grid>
            <Grid item xs={10}>
                <Stack direction="row" justifyContent="center">
                    <StatChanger
                        stat={currentPlayer.basebola}
                        statText="basebola"
                        keyword="BB"
                        statDown={statDown}
                        statUp={statUp}
                        currentPlayer={currentPlayer}
                    />
                    <StatChanger
                        stat={currentPlayer.impulsadas}
                        statText="impulsadas"
                        keyword="CI"
                        statDown={statDown}
                        statUp={statUp}
                        currentPlayer={currentPlayer}
                    />
                </Stack>
            </Grid>
            <Grid item container xs={10} justifyContent="center" rowSpacing={3}>
                <Grid item container xs={12} justifyContent="center">
                    <Grid item xs={6}>
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
                            options={fieldList}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Strikeout" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction="row">
                            <IconButton
                                color="primary"
                                onClick={() =>
                                    statDown(valueK, 'strikeout', true)
                                }>
                                <RemoveCircleIcon sx={{fontSize: 40}} />
                            </IconButton>
                            {/* <p>{currentPlayer.strikeout}</p> */}
                            <IconButton
                                color="primary"
                                onClick={() =>
                                    statUp(valueK, 'strikeout', true)
                                }>
                                <AddCircleIcon sx={{fontSize: 40}} />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="center">
                    <Grid item xs={6}>
                        <Autocomplete
                            value={valueE}
                            onChange={(event, newValue) => {
                                setValueE(newValue)
                            }}
                            inputValue={inputValueE}
                            onInputChange={(event, newInputValue) => {
                                setInputValueE(newInputValue)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option === value
                            }
                            options={fieldList}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Error" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction="row">
                            <IconButton
                                color="primary"
                                onClick={() =>
                                    statDown(valueK, 'errores', true)
                                }>
                                <RemoveCircleIcon sx={{fontSize: 40}} />
                            </IconButton>
                            {/* <p>{currentPlayer.strikeout}</p> */}
                            <IconButton
                                color="primary"
                                onClick={() => statUp(valueK, 'errores', true)}>
                                <AddCircleIcon sx={{fontSize: 40}} />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="center">
                    <Grid xs={6}>
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
                            options={fieldList}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Out" />
                            )}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <Stack direction="row">
                            <IconButton
                                color="primary"
                                onClick={() => statDown(valueO, 'out', true)}>
                                <RemoveCircleIcon sx={{fontSize: 40}} />
                            </IconButton>
                            {/* <p>{currentPlayer.out}</p> */}
                            <IconButton
                                color="primary"
                                onClick={() => statUp(valueO, 'out', true)}>
                                <AddCircleIcon sx={{fontSize: 40}} />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="center">
                    <Grid item xs={6}>
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
                            options={batterList}
                            getOptionLabel={option => option.number}
                            renderInput={params => (
                                <TextField {...params} label="Emergente" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton
                            onClick={() => onHandleDesignatedHitter(valueD)}>
                            <DoubleArrowIcon
                                color="primary"
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
