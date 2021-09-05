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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";

import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '10px'
    },
    pageHeading: {
        flexGrow: 1
    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const BookList = () => {

    const classes = useStyles();
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState({})
    const [addFormOpened, setAddFormOpned] = useState(false)
    const [editFormOpened, setEditFormOpned] = useState(false)
    const [deleteDialogOpened, setDeleteDialogOpened] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarOpened, setSnackbarOpened] = useState(false)


    async function fetchData() {
        const response = await fetch('/books')
        const data = await response.json()
        setBooks(data)
    }

    async function addBook(book) {
        await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
        setAddFormOpned(false)
        openSnackbar(`Book has been added`)
        fetchData()
    }

    function showEditBookDialog(book) {
        setEditFormOpned(true)
        setSelectedBook(book)
    }

    async function editBook(book) {
        await fetch(`/books/${book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
        setEditFormOpned(false)
        openSnackbar(`Book has been updated`)
        fetchData()
    }

    function confirmDelettion(book) {
        setDeleteDialogOpened(true)
        setSelectedBook(book)
    }

    async function deleteBook(book) {
        await fetch(`/books/${book.id}`, {
            method: 'DELETE'
        })
        setDeleteDialogOpened(false)
        openSnackbar(`Book has been deleted`)
        fetchData()
    }

    function openSnackbar(message) {
        setSnackbarMessage(message)
        setSnackbarOpened(true)
    }

    function closeSnackbar() {
        setSnackbarOpened(false)
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

            <Snackbar open={snackbarOpened} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <AddBookForm
                opened={addFormOpened}
                onClose={() => setAddFormOpned(false)}
                onAdd={addBook} />

            <EditBookForm
                book={selectedBook}
                setBook={setSelectedBook}
                opened={editFormOpened}
                onClose={() => setEditFormOpned(false)}
                onEdit={() => editBook(selectedBook)} />

            <ConfirmDialog
                opened={deleteDialogOpened}
                message={"Do you want to delete " + selectedBook.name}
                onOk={() => deleteBook(selectedBook)}
                onCancel={() => setDeleteDialogOpened(false)}
            />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {books.map(book => (
                            <TableRow key={book.id}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell align="right">{book.price} {book.currency}</TableCell>
                                <TableCell>
                                    <IconButton edge="end" color="inherit" onClick={() => showEditBookDialog(book)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" color="inherit" onClick={() => confirmDelettion(book)}>
                                        <RemoveCircleIcon />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    )
}

export default BookList
