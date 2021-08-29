import { useEffect, useState } from "react";

import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from "@material-ui/core/styles";

import AddBookForm from "./AddBookForm";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '10px'
    },
    pageHeading: {
        flexGrow: 1
    }
}))


const BookList = () => {

    const classes = useStyles();
    const [books, setBooks] = useState([])
    const [addFormOpened, setAddFormOpned] = useState(false)

    async function fetchData() {
        const response = await fetch('/books')
        const data = await response.json()
        setBooks(data)
    }

    async function addBook(book) {
        await fetch('/books', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
        setAddFormOpned(false)
        fetchData()        
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Paper className={classes.paper}>

            <Toolbar>
                <Typography variant="h6" className={classes.pageHeading}>
                    Book List
                </Typography>

                <IconButton edge="end" color="inherit" onClick={() => setAddFormOpned(true)}>
                    <AddCircleIcon />
                </IconButton>
            </Toolbar>

            <AddBookForm
                opened={addFormOpened}
                onClose={() => setAddFormOpned(false)}
                onAdd={addBook} />

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
