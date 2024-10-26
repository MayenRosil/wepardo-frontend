import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const UsersContent = ({ list, promoteEmployee, setShowAddEmployeeModal }) => {

    const [filteredList, setFilteredList] = useState(list)
    const [filteredText, setFilteredText] = useState("")

    useEffect(() => {
        setFilteredList(list)
    }, [list])

    const filterText = (text) => {
        setFilteredText(text)

        if (text != "") {
            setFilteredList(filteredList.filter((rec) => rec.username.toLowerCase().trim().includes(text) ||
                rec.email.toLowerCase().trim().includes(text) || 
                rec.exchangePoints.toString().toLowerCase().trim().includes(text) || rec.id.toString().toLowerCase().trim().includes(text)))
        } else {
            setFilteredList(list)
        }

    }

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                padding: "1em",
                margin: 5,
                maxHeight: 500
            }}
        >
            <Button color={"primary"} size="small" onClick={() => { setShowAddEmployeeModal(true) }}
                variant="contained" style={{ marginRight: 2.5 }}>
                Agregar empleado
            </Button>
            <TextField
                margin="normal"
                fullWidth
                id="filteredText"
                label="Search..."
                name="filteredText"
                autoComplete="filteredText"
                autoFocus
                value={filteredText}
                onChange={(e) => { filterText(e.target.value) }}
            />
            <TableContainer sx={{ maxHeight: 400 }} component={Paper}>

                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Usuario</TableCell>
                            <TableCell align="right">Correo</TableCell>
                            <TableCell align="right">Puntos</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.map(({ id, username, email, exchangePoints }, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">{id}</TableCell>
                                <TableCell align="right">{username}</TableCell>
                                <TableCell align="right">{email}</TableCell>
                                <TableCell align="right">{exchangePoints}</TableCell>
                                <TableCell align="right">
                                    <Button color={"secondary"} size="small" onClick={() => { promoteEmployee("modal", id) }}
                                        variant="contained" style={{ marginRight: 2.5 }}>
                                        Sumar puntos
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UsersContent;
