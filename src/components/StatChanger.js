import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const StatChanger = ({stat, statText, keyword, currentPlayer, statUp, statDown}) => {
    return (
        <Stack alignItems="center">
            <h3>{keyword}</h3>
            <IconButton onClick={() => statUp(currentPlayer, statText)} color="primary"><AddCircleIcon sx={{ fontSize: 30 }}/></IconButton>
            <span>{stat}</span>
            <IconButton onClick={() => statDown(currentPlayer, statText)} color="primary"><RemoveCircleIcon sx={{ fontSize: 30 }}/></IconButton>
        </Stack>
    )
}

export default StatChanger
