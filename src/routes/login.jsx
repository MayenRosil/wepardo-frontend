// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
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
import '../styles/takePhoto.css'
import TakePhoto from '../components/takePhoto';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Wepardo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




const defaultTheme = createTheme();



export default function SignInSide() {

    const navigate = useNavigate();


    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [authToken, setAuthToken] = useState(null);
    const [recoveryEmail, setRecoveryEmail] = useState("");
    const [recoveryCode, setRecoveryCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [solicitarFoto, setSolicitarFoto] = useState(false);
    const [imagenExiste, setImagenExiste] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);



    const handleOpenModal = () => setShowPasswordModal(true);
    const handleCloseModal = () => { setShowPasswordModal(false); setShowPasswordRecovery(false); setRecoveryEmail(""); setNewPassword(""); setRecoveryCode(""); }

    const handleClosePhoto = () => setSolicitarFoto(false);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnack(false);
    };

    const action = (
        <React.Fragment>
            <Button color={"primary"} size="small" onClick={handleClose}>
                X
            </Button>
        </React.Fragment>
    );


    const toggleSnack = (action) => {
        setShowSnack(action)
    }

    const signIn = () => {

        if (userUsername == "") {
            setSnackText("Ingresa usuario")
            toggleSnack(true)
            return;
        }
        if (userPassword == "") {
            setSnackText("Ingresa clave")
            toggleSnack(true)
            return;
        }

        let cuerpo = {
            username: userUsername,
            password: userPassword
        }
        fetch('https://wepardo.services/api/auth', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuerpo)
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                    throw new Error('La solicitud falló');
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                console.log(data);
                if (data.errorCode == 0) {
                    localStorage.setItem('sessionToken', data.token)
                    setAuthToken(data.token)
                    if (data.imageExist) setImagenExiste(true);
                    setSolicitarFoto(true);
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

    const uploadPhoto = async (imageData) => {
        let cuerpo = {
            base64image: imageData,
            username: userUsername,
            exist: imagenExiste
        }
        console.log(cuerpo)
        await fetch('https://wepardo.services/api/auth/uploadImage', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': "application/json",
                'Content-Length': JSON.stringify(cuerpo).length
            },
            body: JSON.stringify(cuerpo)
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                    throw new Error('La solicitud falló');
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                localStorage.setItem('sessionToken', authToken)
                navigate('/home')
                console.log(data);
                setSnackText(data.message);
                setShowSnack(true);
            })
            .catch(error => {
                // Manejar errores
                console.error('Ocurrió un error:', error);
                setSnackText('Error inesperado');
                setShowSnack(true);
            });
    }


    const sendRecoveryCode = async () => {
        if (recoveryEmail == "") {
            setSnackText("Ingresa email")
            toggleSnack(true)
            return;
        }

        let cuerpo = {
            email: recoveryEmail,
        }
        fetch('https://wepardo.services/api/password/recover', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuerpo)
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                    throw new Error('La solicitud falló');
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                console.log(data);
                if (data.errorCode == 0) {
                    setShowPasswordRecovery(true)
                    setSnackText('Codigo enviado');
                    setShowSnack(true);
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

    const validateRecoveryCode = async () => {
        if (recoveryCode == "") {
            setSnackText("Ingresa codigo")
            toggleSnack(true)
            return;
        }
        if (newPassword == "") {
            setSnackText("Ingresa clave")
            toggleSnack(true)
            return;
        }

        let cuerpo = {
            verificationCode: recoveryCode,
            email: recoveryEmail,
            password: newPassword
        }
        fetch('https://wepardo.services/api/password/verify', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuerpo)
        })
            .then(response => {
                if (!response.ok) {
                    setSnackText("La solicitud falló");
                    setShowSnack(true);
                    throw new Error('La solicitud falló');
                }
                return response.json(); // Convertir la respuesta a formato JSON
            })
            .then(data => {
                // Aquí puedes trabajar con los datos obtenidos
                console.log(data);
                if (data.errorCode == 0) {
                    handleCloseModal();
                    setSnackText(data.message);
                    setShowSnack(true);
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
        <ThemeProvider theme={defaultTheme}>


            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0', height: '100vh' }}>

                <Grid container sx={{ height: '80vh', width: '130vh', borderRadius: '30px', overflow: 'hidden', backgroundColor: 'white' }}>
                    <Snackbar
                        open={showSnack}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        message={snackText}
                        action={action}

                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    />
                    {solicitarFoto ?
                        <div style={{ padding: '100px', backgroundColor: 'transparent', width: '90%', height: '90%', maxWidth: '100%', maxHeight: '80%', }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{ borderWidth: 1, borderColor: 'black' }}>
                                    <Button color={"error"} size="small" onClick={handleClosePhoto}
                                        variant="outlined">
                                        ⬅
                                    </Button>
                                </div>
                            </div>
                            <TakePhoto userName={userUsername} imagenExiste={imagenExiste} uploadPhoto={(img) => uploadPhoto(img)} />
                        </div>
                        :
                        <>
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: 'url(/bkgWorker.svg)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: '80%',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Grid item sx={{ m: 1, bgcolor: 'secondary' }}>
                                        <img src="/Chetah.svg" alt="My Icon" />
                                    </Grid>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
                                            value={userUsername}
                                            onChange={(e) => { setUserUsername(e.target.value) }}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={userPassword}
                                            onChange={(e) => { setUserPassword(e.target.value) }}
                                        />
                                        {/* <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        /> */}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={(e) => {
                                                signIn();
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ mt: 3, mb: 2 }}
                                                    onClick={
                                                        handleOpenModal
                                                    }
                                                >
                                                    Forgot password?
                                                </Button>
                                            </Grid>
                                            {/* <Grid item>
                                                <Link href="#" variant="body2">
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid> */}
                                        </Grid>
                                        <Copyright sx={{ mt: 5 }} />
                                    </Box>
                                </Box>
                            </Grid>
                        </>
                    }

                    <Modal
                        open={showPasswordModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>

                            <Typography component="h1" variant="h5">
                                Recover your password
                            </Typography>
                            {!showPasswordRecovery ?
                                <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Type your registered email. You'll receive a verification code.
                                    </Typography>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={recoveryEmail}
                                        onChange={(e) => { setRecoveryEmail(e.target.value) }}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={(e) => {
                                            sendRecoveryCode();
                                        }}
                                    >
                                        Send code
                                    </Button>
                                </Box>
                                :
                                <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Type the code you have received at your email address.
                                    </Typography>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="verificationCode"
                                        label="Verification code"
                                        name="verificationCode"
                                        autoComplete="verificationCode"
                                        value={recoveryCode}
                                        onChange={(e) => { setRecoveryCode(e.target.value) }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="newPassword"
                                        label="New password"
                                        type="password"
                                        id="newPassword"
                                        autoComplete="current-password"
                                        value={newPassword}
                                        onChange={(e) => { setNewPassword(e.target.value) }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={(e) => {
                                            validateRecoveryCode();
                                        }}
                                    >
                                        Validate code
                                    </Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 0, mb: 0 }}
                                        onClick={(e) => {
                                            sendRecoveryCode();
                                        }}
                                    >
                                        Re-Send code
                                    </Button>
                                </Box>
                            }
                        </Box>
                    </Modal>

                </Grid>
            </div>
        </ThemeProvider>
    );
}