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



const EmployeesContent = ({ list, setShowAddEmployeeModal, deleteEmployee }) => {

    const [filteredList, setFilteredList] = useState(list)
    const [filteredText, setFilteredText] = useState("")

    useEffect(() => {
        setFilteredList(list)
    }, [list])

    const filterText = (text) => {
        setFilteredText(text)

        if (text != "") {
            setFilteredList(filteredList.filter((rec) => rec.firstName.toLowerCase().trim().includes(text) ||
                rec.CUI.toLowerCase().trim().includes(text) || rec.user.username.toLowerCase().trim().includes(text) ||
                rec.firstLastName.toLowerCase().trim().includes(text) || rec.id.toString().toLowerCase().trim().includes(text)))
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
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">CUI</TableCell>
                            <TableCell align="right">Usuario</TableCell>
                            <TableCell align="right">Puntos</TableCell>
                            <TableCell align="right">Puesto</TableCell>
                            <TableCell align="right">Departamento</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.map(({ id, firstName, firstLastName, CUI, user, position }, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">{id}</TableCell>
                                <TableCell align="right">{firstName}</TableCell>
                                <TableCell align="right">{firstLastName}</TableCell>
                                <TableCell align="right">{CUI}</TableCell>
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">{user.exchangePoints}</TableCell>
                                <TableCell align="right">{position.positionName}</TableCell>
                                <TableCell align="right">{position.department.departmentName}</TableCell>
                                <TableCell align="right">
                                    <Button color={"secondary"} size="small" onClick={() => { deleteEmployee(id) }}
                                        variant="contained" style={{ marginRight: 2.5 }}>
                                        Ascender
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button color={"error"} size="small" onClick={() => { deleteEmployee(id) }}
                                        variant="contained" style={{ marginRight: 2.5 }}>
                                        Borrar
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

export default EmployeesContent;
