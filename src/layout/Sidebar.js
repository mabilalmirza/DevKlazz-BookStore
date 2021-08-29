import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: '10px'
    },
    toolbar: theme.mixins.toolbar

}))

const Sidebar = ({ opened }) => {

    const classes = useStyles()

    return (
        <Drawer variant="persistent" className={classes.drawer} classes={{ paper: classes.drawerPaper }} open={opened}>
            <div className={classes.toolbar}></div>
            Sidebar contents goes here
        </Drawer>
    )
}

export default Sidebar
