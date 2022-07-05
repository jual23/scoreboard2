import StatChanger from './StatChanger'
import {Autocomplete, TextField, Stack} from '@mui/material'

import {useState} from 'react'

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
        <div className="player-list_stats_modal">
            <h3>{player.name}</h3>
            <div>
                <ul>
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
                </ul>
            </div>
            <Stack>
                <div>
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
                        options={reserve}
                        getOptionLabel={option => option.number}
                        sx={{width: 200}}
                        renderInput={params => (
                            <TextField {...params} label="Strikeout" />
                        )}
                    />
                    <button onClick={() => statUp(valueK, 'strikeout')}>
                        K
                    </button>
                    {player.strikeout}
                </div>
                <div>
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
                        options={reserve}
                        getOptionLabel={option => option.number}
                        sx={{width: 200}}
                        renderInput={params => (
                            <TextField {...params} label="Out" />
                        )}
                    />
                    <button onClick={() => statUp(valueO, 'out')}>O</button>
                    {player.out}
                </div>
                <div>
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
                        sx={{width: 200}}
                        renderInput={params => (
                            <TextField {...params} label="Emergente" />
                        )}
                    />
                    <button onClick={() => onHandleDesignatedHitter(valueD)}>
                        Emergente
                    </button>
                </div>
            </Stack>
        </div>
    )
}

export default ModalStats
