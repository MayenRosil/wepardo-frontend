import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/root.css';
import ResponsiveAppBar from '../components/UI-home/navBar';
import LogsContent from '../components/logs/logsContent';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import EmployeesContent from '../components/employees/employeesContent';
import Modal from '@mui/material/Modal';
import AddEmployeeModal from '../components/employees/addEmployeeModal';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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

const Employees = () => {

    const navigate = useNavigate();


    const [showSnack, setShowSnack] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

    const [recordList, setRecordList] = useState([])
    const [positionList, setPositionList] = useState([])
    const [userList, setUserList] = useState([])

    const [authToken, setAuthToken] = useState("")
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false)
    const [showPromoteEmployeeModal, setShowPromoteEmployeeModal] = useState(false)

    const [newSelectedPosition, setNewSelectedPosition] = useState({});

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnack(false);
    };

    const toggleSnack = (action) => {
        setShowSnack(action)
    }

    const handleCloseModal = () => { setShowPromoteEmployeeModal(false); }

    const action = (
        <React.Fragment>
            <Button color={"primary"} size="small" onClick={handleClose}>
                X
            </Button>
        </React.Fragment>
    );

    useEffect(() => {
        const sessionToken = (localStorage.getItem('sessionToken'));
        if (sessionToken) {
            setAuthToken(sessionToken);
            getEmployees(sessionToken);
            if (positionList.length >= 0) getPositions(sessionToken);
            if (userList.length >= 0) getUsers(sessionToken);
        };
    }, [showAddEmployeeModal, deleteButtonPressed])

    useEffect(() => {
        const sessionToken = (localStorage.getItem('sessionToken'));
        if (sessionToken) {
            setAuthToken(sessionToken);
            getEmployees(sessionToken);
        };
    }, [showPromoteEmployeeModal])

    const promoteEmployee = async (action, employeeId, positionId) => {
        if (action === "modal") {
            setNewSelectedPosition({ ...newSelectedPosition, employeeId: employeeId })
            setShowPromoteEmployeeModal(true)
        }

        if (action === "save") {
            console.log(employeeId, positionId)
            await fetch(`http://localhost:3001/api/employee`, {
                method: 'PATCH',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ employee: employeeId, position: positionId })
            })
                .then(response => {
                    if (!response.ok) {
                        setSnackText("La solicitud falló");
                        setShowSnack(true);
                    }
                    return response.json(); // Convertir la respuesta a formato JSON
                })
                .then(data => {
                    // Aquí puedes trabajar con los datos obtenidos
                    console.log(data);
                    if (data.errorCode == 0) {
                        setSnackText(data.message);
                        setShowSnack(true);
                        setShowPromoteEmployeeModal(false);
                    } else {
                        setSnackText(data.message);
                        setShowSnack(true);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    console.error('Ocurrió un error:', error);
                    setSnackText('Error inesperado');
                    setShowSnack(true);
                })
        }
    }

    const getUsers = async (token) => {
        await fetch('http://localhost:3001/api/users', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                console.log(data);
                if (data.errorCode == 0) {
                    setUserList(data.users)
                } else {
                    setSnackText(data.message);
                    setShowSnack(true);
                }
            })
            .catch(error => {
                // Manejar errores
                console.error('Ocurrió un error:', error);
                setSnackText('Error inesperado');
                setShowSnack(true);
            })
    }

    const getPositions = async (token) => {
        await fetch('http://localhost:3001/api/position', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                console.log(data);
                if (data.errorCode == 0) {
                    setPositionList(data.positions)
                } else {
                    setSnackText(data.message);
                    setShowSnack(true);
                }
            })
            .catch(error => {
                // Manejar errores
                console.error('Ocurrió un error:', error);
                setSnackText('Error inesperado');
                setShowSnack(true);
            })
    }

    const getEmployees = async (token) => {
        await fetch('http://localhost:3001/api/employee', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                console.log(data);
                if (data.errorCode == 0) {
                    setRecordList(data.employees)
                } else {
                    setSnackText(data.message);
                    setShowSnack(true);
                }
            })
            .catch(error => {
                // Manejar errores
                console.error('Ocurrió un error:', error);
                setSnackText('Error inesperado');
                setShowSnack(true);
            })
    }

    const saveEmployee = async (data) => {
        await fetch('http://localhost:3001/api/employee', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                console.log(data);
                if (data.errorCode == 0) {
                    setSnackText(data.message);
                    setShowSnack(true);
                    setShowAddEmployeeModal(false);
                } else {
                    setSnackText(data.message);
                    setShowSnack(true);
                }
            })
            .catch(error => {
                // Manejar errores
                console.error('Ocurrió un error:', error);
                setSnackText('Error inesperado');
                setShowSnack(true);
            })
    }

    const deleteEmployee = async (id) => {
        setDeleteButtonPressed(!deleteButtonPressed)
        await fetch(`http://localhost:3001/api/employee/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                console.log(data);
                if (data.errorCode == 0) {
                    setSnackText(data.message);
                    setShowSnack(true);
                    setShowAddEmployeeModal(false);
                } else {
                    setSnackText(data.message);
                    setShowSnack(true);
                }
            })
            .catch(error => {
                // Manejar errores
                console.error('Ocurrió un error:', error);
                setSnackText('Error inesperado');
                setShowSnack(true);
            })
    }

    return (
        <>
            <Snackbar
                open={showSnack}
                autoHideDuration={5000}
                onClose={handleClose}
                message={snackText}
                action={action}

                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
            <ResponsiveAppBar />
            <EmployeesContent promoteEmployee={promoteEmployee} setShowAddEmployeeModal={setShowAddEmployeeModal} deleteEmployee={deleteEmployee} list={recordList} />
            {showAddEmployeeModal &&
                <AddEmployeeModal positionList={positionList} userList={userList} setShowAddEmployeeModal={setShowAddEmployeeModal} saveEmployee={saveEmployee} />
            }

            {showPromoteEmployeeModal &&
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
                                Promote employee.
                            </Typography>
                            <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Select the new position.
                                </Typography>

                                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={newSelectedPosition.positionId}
                                    label="Position"
                                    onChange={(e) => setNewSelectedPosition({ ...newSelectedPosition, positionId: e.target.value })}
                                >
                                    {positionList.filter(p => p.department.id === 1).map((pst, idx) => {
                                        return (
                                            <MenuItem value={pst.id}>{pst.positionName}</MenuItem>
                                        )
                                    })}
                                </Select>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 0 }}
                                    onClick={(e) => {
                                        promoteEmployee("save", newSelectedPosition.employeeId, newSelectedPosition.positionId);
                                    }}
                                >
                                    Promote employee
                                </Button>
                            </Box>

                        </Box>
                    </Grid>
                </Modal>
            }

        </>
    )
}
export default Employees;