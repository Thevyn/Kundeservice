import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

const AdminStyle = makeStyles((theme: Theme) => createStyles({
    bakgrunnStil: {
        height: '200px',
        width: '100%',
        marginBottom: '2rem',
        "&:after": {
            content: "''",
            width: "200px",
            height: "2px",
            background: "#fff",
            position: "absolute",
            left: "50%",
            marginTop: '2rem',
            transform: "translateX(-50%)"
        }
    },
    title: {
        textAlign: 'center',
        paddingTop: '2rem',
        color: '#fff',
    },
    root: {
        width: '100%',
        marginTop: '2rem'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    cardHeader: {
        textTransform: 'uppercase'
    }
}));

export default AdminStyle;