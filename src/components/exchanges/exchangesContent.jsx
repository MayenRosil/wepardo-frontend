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



const ExchangesContent = ({ list, setShowAddEmployeeModal, deleteEmployee }) => {

    const [filteredList, setFilteredList] = useState(list)
    const [filteredText, setFilteredText] = useState("")

    useEffect(() => {
        setFilteredList(list)
    }, [list])

    const filterText = (text) => {
        setFilteredText(text)

        if (text != "") {
            setFilteredList(filteredList.filter((rec) => rec.name.toLowerCase().trim().includes(text) ||
                rec.points.toString().toLowerCase().trim().includes(text) || rec.id.toString().toLowerCase().trim().includes(text)))
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
                Agregar producto
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
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">Descripción</TableCell>
                            <TableCell align="right">Coste</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.map(({ id, image, name, points }, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">{id}</TableCell>
                                <TableCell align="right">
                                    <img src={image} alt={name} width="50" height="50" />
                                </TableCell>
                                <TableCell align="right">{name}</TableCell>
                                <TableCell align="right">{points}</TableCell>
                                <TableCell align="right">
                                <Button color={"secondary"} size="small" onClick={() => { deleteEmployee(id) }}
                                    variant="contained" style={{ marginRight: 2.5 }}>
                                    Canjear
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

export default ExchangesContent;
