import { useState } from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

const EditBookForm = ({ book, setBook, opened, onClose, onEdit }) => {

    function updateValue(e) {
        const newBook = {
            ...book,
            [e.target.name]: e.target.value
        }
        setBook(newBook)
    }

    function cancel() {
        onClose()
    }

    function edit() {
        onEdit(book)
    }

    return (
        <div>

            <Dialog open={opened} onClose={onClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Edit Book </DialogTitle>

                <DialogContent>
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
                    <Button onClick={edit} color="primary">
                        Edit Book
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default EditBookForm
