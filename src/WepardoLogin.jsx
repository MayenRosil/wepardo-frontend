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
import './styles/takePhoto.css'
import TakePhoto from './components/takePhoto';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';


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



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function SignInSide() {

    const [solicitarFoto, setSolicitarFoto] = useState(false);
    const [imagenExiste, setImagenExiste] = useState(false);
    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showSnack, setShowSnack] = useState(false);
    const [snackText, setSnackText] = useState("");

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
        fetch('http://localhost:3001/api/auth', {
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
            });


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
                                            id="email"
                                            label="Username"
                                            name="email"
                                            autoComplete="email"
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
                                                <Link href="#" variant="body2">
                                                    Forgot password?
                                                </Link>
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
                </Grid>
            </div>
        </ThemeProvider>
    );
}