import makeStyles from "@material-ui/core/styles/makeStyles";

const NavMenuStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        letterSpacing: '5px'
    },
    appBar: {
        backgroundColor: '#59bba6',
        color: '#fff',
        transform: 'none'
    },
    toolBar: {
        "& a": {
            margin: "25px 25px",
            textTransform: "none",
            fontSize: '1rem',
            borderRadius: "0",

            "&:hover": {
                backgroundColor: "rgba(89,187,166,0.64)",
                boxShadow: "inset 0 -2px 0 0 #000",
                color: "#fff",
            }
        }
    }
}));

export default NavMenuStyle;