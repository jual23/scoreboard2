import React from 'react'
import {useState} from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    Stack,
    IconButton,
    Button,
    Typography,
    Menu,
    MenuItem,
    Dialog,
} from '@mui/material'
import logo from '../assets/demlogo.png'
import MenuIcon from '@mui/icons-material/Menu'
import {useNavigate} from 'react-router-dom'

const ResponsiveAppBar = ({reset, existing}) => {
    const navigate = useNavigate()
    const [menuNav, setMenuNav] = useState(null)
    const [clearDialog, setClearDialog] = useState(false)

    const handleOpenNavMenu = event => {
        setMenuNav(event.currentTarget)
    }

    const clearData = () => {
        handleCloseNavMenu()
        setClearDialog(false)
        localStorage.clear()
        reset()
        navigate('/')
    }

    const loadData = () => {
        navigate('/tracker')
        handleCloseNavMenu()
    }

    const handleCloseNavMenu = () => {
        setMenuNav(null)
    }

    return (
        <>
            <AppBar position="sticky" sx={{backgroundColor: 'black', mb: 2}}>
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, ml: 2}}>
                        <img src={logo} width="50" alt="DEM Logo" />
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={menuNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(menuNav)}
                            onClose={handleCloseNavMenu}>
                            {existing && (
                                <MenuItem
                                    onClick={() => {
                                        loadData()
                                    }}>
                                    <Typography textAlign="center">
                                        Cargar juego
                                    </Typography>
                                </MenuItem>
                            )}
                            <MenuItem
                                onClick={() => {
                                    setClearDialog(true)
                                }}>
                                <Typography textAlign="center">
                                    Nuevo juego
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Dialog open={clearDialog}>
                <Box sx={{padding: 3}}>
                    <h2>
                        ¿Desea borrar la información e iniciar un nuevo partido?
                    </h2>
                    <Stack direction="row" justifyContent="space-evenly">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                clearData()
                            }}>
                            {' '}
                            Si
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setClearDialog(false)}>
                            {' '}
                            No
                        </Button>
                    </Stack>
                </Box>
            </Dialog>
        </>
    )
}
export default ResponsiveAppBar
