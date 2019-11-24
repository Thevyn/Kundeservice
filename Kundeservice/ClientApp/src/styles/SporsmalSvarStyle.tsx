import makeStyles from "@material-ui/core/styles/makeStyles";


const SporsmalSvarStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '2rem'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    thumbUp: {
        color: 'green'
    },
    thumbDown: {
        color:'red'
    },
    useful: {
        margin: '2rem 0 1rem 0'
    },
    positivRating: {
        margin: '0.5rem 2rem 0 2rem',
        color: 'green'
    },
    negativRating: {
        margin: '0.5rem 2rem 0 2rem',
        color: 'red'
    }
}));

export default SporsmalSvarStyle;