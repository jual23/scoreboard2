import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const StatChanger = ({stat, statText, keyword, player, statUp, statDown}) => {
    return (
        <Stack alignItems="center">
            <h3>{keyword}</h3>
            <IconButton onClick={() => statUp(player, statText)} color="success"><AddCircleIcon sx={{ fontSize: 40 }}/></IconButton>
            <p>{stat}</p>
            <IconButton onClick={() => statDown(player, statText)} color="success"><RemoveCircleIcon sx={{ fontSize: 40 }}/></IconButton>
        </Stack>
    )
}

export default StatChanger
