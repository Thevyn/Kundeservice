import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

const FAQStyle = makeStyles( (theme : Theme)  => createStyles({
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
    root: {
        padding: '2px 4px',
        display: 'flex',
        margin: '1rem auto 0 auto',
        alignItems: 'center',
        width: 500,
        borderRadius: 100
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    categoryButtons: {
        textAlign: 'center',
    },
    buttonStyle: {
        marginLeft: '1rem',
        "&:hover": {
            backgroundColor: '#59bba6',
            color: '#fff'
        }
    },
    categoryTitle: {
        textAlign: 'center',
        marginTop: '2rem',
        textTransform: 'uppercase',
        "&:after": {
            content: "''",
            width: '20px',
            height: '2px',
            background: '#59bba6',
            position: 'absolute',
            left: '50%',
            marginTop: '3rem',
            transform: 'translateX(-50%)'
        }
    }
}));

export default FAQStyle;