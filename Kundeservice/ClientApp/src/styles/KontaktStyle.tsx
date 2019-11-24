import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

const KontaktStyle = makeStyles( (theme : Theme)  => createStyles({
    bakgrunnStil: {
        backgroundColor: 'rgba(89,187,166,0.64)',
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
        color: '#fff'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
        marginBottom: '1rem'
    },
    menu: {
        width: 200,
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        margin: '1rem auto 0 auto',
        alignItems: 'center',
        width: 500,
    },
}));

export default KontaktStyle;