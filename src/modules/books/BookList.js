import { useEffect, useState } from "react";

import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '10px'
    }
}))

const BookList = () => {

    const classes = useStyles();
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('http://localhost:3010/books')
            .then(response => response.json())
            .then(data => setBooks(data));
    }, [])



    return (
        <Paper className={classes.paper}>
            <h1>Book List</h1>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {books.map(book => (
                            <TableRow key={book.id}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell align="right">{book.price} {book.currency}</TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    )
}

export default BookList
