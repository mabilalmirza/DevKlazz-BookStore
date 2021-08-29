import { useState } from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

const AddBookForm = ({ opened, onClose, onAdd }) => {

    const defaultBook = {name: '', author: '', price: 0, currency: "PKR"};
    const [book, setBook] = useState(defaultBook)

    function updateValue(e) {
        const newBook = {
            ...book,
            [e.target.name]: e.target.value
        }
        setBook(newBook)
    }

    function resetBook() {
        setBook(defaultBook)
    }

    function cancel() {
        onClose()
        resetBook()
    }

    function add() {
        onAdd(book)
        resetBook()
    }

    return (
        <div>

            <Dialog open={opened} onClose={onClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Add Book</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Add Book here
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        value={book.name}
                        fullWidth
                        onChange={updateValue}
                    />

                    <TextField
                        name="author"
                        label="Author"
                        type="text"
                        value={book.author}
                        fullWidth
                        onChange={updateValue}
                    />

                    <TextField
                        name="price"
                        label="Price"
                        type="number"
                        value={book.price}
                        fullWidth
                        onChange={updateValue}
                    />

                    <TextField
                        name="currency"
                        label="Currency"
                        select
                        fullWidth
                        value={book.currency}
                        onChange={updateValue}  
                    >
                        <MenuItem key="USD" value="USD">
                            US Dollar
                        </MenuItem>

                        <MenuItem key="PKR" value="PKR">
                            Pakistani Rupee
                        </MenuItem>
                        
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={add} color="primary">
                        Add Book
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddBookForm
