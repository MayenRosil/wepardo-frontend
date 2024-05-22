import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/root.css';
import ResponsiveAppBar from '../components/UI-home/navBar';
import LogsContent from '../components/logs/logsContent';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import ExchangesContent from '../components/exchanges/exchangesContent';
import Modal from '@mui/material/Modal';
import AddEmployeeModal from '../components/employees/addEmployeeModal';


const Exchange = () => {

    const navigate = useNavigate();


    const [showSnack, setShowSnack] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

    const [exchangeCatalog, setExchangeCatalog] = useState([])
    const [userList, setUserList] = useState([])

    const [authToken, setAuthToken] = useState("")
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnack(false);
    };

    const toggleSnack = (action) => {
        setShowSnack(action)
    }


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
            getExchangeCatalog(sessionToken);
            if(userList.length >= 0) getUsers(sessionToken);
        };
    }, [showAddEmployeeModal])

    const getUsers = async (token) => {
        await fetch('https://wepardo.services/api/users', {
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

    const getExchangeCatalog = async (token) => {
        await fetch('https://wepardo.services/api/exchange', {
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
                    setExchangeCatalog(data.exchangeCatalog)
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
        await fetch('https://wepardo.services/api/employee', {
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
        await fetch(`https://wepardo.services/api/employee/${id}`, {
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
            <ExchangesContent setShowAddEmployeeModal={setShowAddEmployeeModal} deleteEmployee={deleteEmployee} list={exchangeCatalog} />
            {showAddEmployeeModal &&
                <AddEmployeeModal exchangeCatalog={exchangeCatalog} userList={userList} setShowAddEmployeeModal={setShowAddEmployeeModal} saveEmployee={saveEmployee} />
            }

        </>
    )
}
export default Exchange;