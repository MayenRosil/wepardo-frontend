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

const addProductInitialState = {
    image: "",
    name: "",
    points: 0
}

const addProductReducer = (addProductState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'addImage':
            return { ...addProductState, image: payload };
        case 'addName':
            return { ...addProductState, name: payload };
        case 'addPoints':
            return { ...addProductState, points: payload };
        case 'resetForm':
            return addProductInitialState;
        default:
            return true;
    }
}


const AddExchangeModal = ({ setShowAddExchangeModal, positionList, userList, saveProduct }) => {

    const [addProductState, dispatch] = useReducer(addProductReducer, addProductInitialState);

    const handleCloseModal = () => { setShowAddExchangeModal(false); dispatch({ type: 'resetForm' }) }

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
                        Add new product.
                    </Typography>
                    <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Fill the form data.
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            label="Image URL"
                            name="image"
                            autoComplete="image"
                            autoFocus
                            value={addProductState.image}
                            onChange={(e) => { dispatch({ type: 'addImage', payload: e.target.value }) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Product name"
                            name="name"
                            autoComplete="name"
                            value={addProductState.name}
                            onChange={(e) => { dispatch({ type: 'addName', payload: e.target.value }) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="points"
                            label="Points cost"
                            name="points"
                            autoComplete="points"
                            value={addProductState.points}
                            onChange={(e) => { dispatch({ type: 'addPoints', payload: parseInt(e.target.value) }) }}
                        />
                  
       

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            onClick={(e) => {
                                console.log(addProductState, 'estado')
                                saveProduct(addProductState);
                            }}
                        >
                            Save product
                        </Button>
                    </Box>

                </Box>
            </Grid>
        </Modal>
    )
}

export default AddExchangeModal;