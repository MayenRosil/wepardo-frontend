import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/root.css';
import ResponsiveAppBar from '../components/UI-home/navBar';
import LogsContent from '../components/logs/logsContent';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import EmployeesContent from '../components/employees/employeesContent';


const Employees = () => {

    const navigate = useNavigate();


    const [showSnack, setShowSnack] = useState(false);
    const [snackText, setSnackText] = useState("");

    const [recordList, setRecordList] = useState([])

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
            getLogs(sessionToken);
        };
    }, [])


    const getLogs = async (token) => {
        await fetch('https://wepardo.services/api/employee', {
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
            <EmployeesContent list={recordList} />
        </>
    )
}
export default Employees;