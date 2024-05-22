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
    height: 500,
    overflowY: 'scroll'
};

const addEmployeeInitialState = {
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    CUI: "",
    NIT: "",
    user: 0,
    position: 0
}

const addEmployeeReducer = (addEmployeeState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'addFirstName':
            return { ...addEmployeeState, firstName: payload };
        case 'addSecondName':
            return { ...addEmployeeState, secondName: payload };
        case 'addFirstLastName':
            return { ...addEmployeeState, firstLastName: payload };
        case 'addSecondLastName':
            return { ...addEmployeeState, secondLastName: payload };
        case 'addCUI':
            return { ...addEmployeeState, CUI: payload };
        case 'addNIT':
            return { ...addEmployeeState, NIT: payload };
        case 'addUser':
            return { ...addEmployeeState, user: payload };
        case 'addPosition':
            return { ...addEmployeeState, position: payload };
        case 'resetForm':
            return addEmployeeInitialState;
        default:
            return true;
    }
}


const AddEmployeeModal = ({ setShowAddEmployeeModal, positionList, userList, saveEmployee }) => {

    const [addEmployeeState, dispatch] = useReducer(addEmployeeReducer, addEmployeeInitialState);

    const handleCloseModal = () => { setShowAddEmployeeModal(false); dispatch({ type: 'resetForm' }) }

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
                        Add new employee.
                    </Typography>
                    <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Fill the form data.
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                            value={addEmployeeState.firstName}
                            onChange={(e) => { dispatch({ type: 'addFirstName', payload: e.target.value }) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="secondName"
                            label="Second name"
                            name="secondName"
                            autoComplete="secondName"
                            value={addEmployeeState.secondName}
                            onChange={(e) => { dispatch({ type: 'addSecondName', payload: e.target.value }) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstLastName"
                            label="First last name"
                            name="firstLastName"
                            autoComplete="firstLastName"
                            value={addEmployeeState.firstLastName}
                            onChange={(e) => { dispatch({ type: 'addFirstLastName', payload: e.target.value }) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="secondLastName"
                            label="Second last name"
                            name="secondLastName"
                            autoComplete="secondLastName"
                            value={addEmployeeState.secondLastName}
                            onChange={(e) => { dispatch({ type: 'addSecondLastName', payload: e.target.value }) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="CUI"
                            label="CUI"
                            name="CUI"
                            autoComplete="CUI"
                            value={addEmployeeState.CUI}
                            onChange={(e) => { dispatch({ type: 'addCUI', payload: e.target.value }) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="NIT"
                            label="NIT"
                            name="NIT"
                            autoComplete="NIT"
                            value={addEmployeeState.NIT}
                            onChange={(e) => { dispatch({ type: 'addNIT', payload: e.target.value }) }}
                        />

                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addEmployeeState.user}
                            label="User"
                            onChange={(e) => dispatch({ type: 'addUser', payload: e.target.value })}
                        >
                            {userList.map((usr, idx) => {
                                return (
                                    <MenuItem value={usr.id}>{usr.username}</MenuItem>
                                )
                            })}
                        </Select>

                        <InputLabel id="demo-simple-select-label">Position</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addEmployeeState.position}
                            label="Position"
                            onChange={(e) => dispatch({ type: 'addPosition', payload: e.target.value })}
                        >
                            {positionList.map((usr, idx) => {
                                return (
                                    <MenuItem value={usr.id}>{usr.positionName}</MenuItem>
                                )
                            })}
                        </Select>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            onClick={(e) => {
                                saveEmployee(addEmployeeState);
                            }}
                        >
                            Send code
                        </Button>
                    </Box>

                </Box>
            </Grid>
        </Modal>
    )
}

export default AddEmployeeModal;