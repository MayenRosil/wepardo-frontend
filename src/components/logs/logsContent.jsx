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



const LogsContent = ({ list }) => {

    const [filteredList, setFilteredList] = useState(list)
    const [filteredText, setFilteredText] = useState("")

    useEffect(() => {
        setFilteredList(list)
    }, [list])

    const filterText = (text) => {
        setFilteredText(text)

        if (text != "") {
            setFilteredList(filteredList.filter((rec) => rec.entidad.toLowerCase().trim().includes(text) ||
                rec.accion.toLowerCase().trim().includes(text) || rec.id.toString().toLowerCase().trim().includes(text)))
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
                            <TableCell align="right">Entidad</TableCell>
                            <TableCell align="right">Accion</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.map(({ id, entidad, accion, fecha }, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">{id}</TableCell>
                                <TableCell align="right">{entidad}</TableCell>
                                <TableCell align="right">{accion}</TableCell>
                                <TableCell align="right">{fecha}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default LogsContent;
