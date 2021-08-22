import { makeStyles } from "@material-ui/core/styles"

import BookList from "../modules/books/BookList"


const useStyles = makeStyles(theme => ({
    toolbar:theme.mixins.toolbar
}))

const Content = () => {

    const classes = useStyles()

    return (
        <div>
            <div className={classes.toolbar}></div>
            <BookList />
        </div>
    )
}

export default Content
