
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    root: {
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

    title: {
        flexGrow: 1
    }
}))


const Header = ({ sidebarOpened, onToggleSidebar }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onToggleSidebar}
                    >
                        {sidebarOpened ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>

                    <Typography variant="h6" noWrap className={classes.title}>
                        Book Store
                    </Typography>

                    <IconButton edge="end" color="inherit">
                        <AccountBoxIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Header
