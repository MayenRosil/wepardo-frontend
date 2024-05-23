// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: 500,
    overflowY: 'scroll'
};



const ExchangeProductModal = ({ setShowExchangeProductModal, pointsCost, userList, exchangeProduct }) => {

    const [userId, setUserId] = useState(0)

    const handleCloseModal = () => { setShowExchangeProductModal(false); setUserId(0) }

    return (

        <Modal
            open={true}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Grid
                sx={{ overflowY: "scroll", maxHeight: "400px" }}
                container
            >
                <Box sx={modalStyle}>

                    <Typography component="h1" variant="h5">
                        Exchange product.
                    </Typography>
                    <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Select the user to be exchanged.
                        </Typography>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userId}
                            label="User"
                            onChange={(e) => setUserId( parseInt(e.target.value) )}
                        >
                            {userList.map((usr, idx) => {
                                return (
                                    <MenuItem value={usr.id}>{usr.username}</MenuItem>
                                )
                            })}
                        </Select>
                  
       

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            onClick={(e) => {
                                exchangeProduct({user: userId, points: pointsCost});
                            }}
                        >
                            Exchange product
                        </Button>
                    </Box>

                </Box>
            </Grid>
        </Modal>
    )
}

export default ExchangeProductModal;