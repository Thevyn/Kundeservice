import React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import SporsmalSvarStyle from "../styles/SporsmalSvarStyle";

interface ISporsmalSvarProps {
    id: number;
    sporsmal: string;
    svar: string;
    positiv: number;
    negativ: number;
    fetchSporsmal: () => void;
}

interface ISporsmalSvarState {
    svar: string;

}

interface SporsmalParams {
    id: number;
    sporsmal: string;
    svar: string;
    positiv: number;
    negativ: number;

}

const useStyles = SporsmalSvarStyle;



class SporsmalSvar extends React.Component<ISporsmalSvarProps, ISporsmalSvarState>{
    constructor(props: Readonly<ISporsmalSvarProps>) {
        super(props);
        this.state = {
            svar: this.props.svar
        };
    }

    public postRating = (postData : any) => {
        const json = JSON.stringify(postData);
        console.log(json);
        fetch("api/Kundeservice/endreRating", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: json
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                this.props.fetchSporsmal();
            } else {
                alert("FeilMelding");
            }
        });
    };
    
    
    public Sporsmal = ({sporsmal, svar, positiv,negativ, id}: SporsmalParams) => {
        const classes = useStyles();
        return (
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{sporsmal}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                                <Typography>
                                    {svar}
                                </Typography>
                         
                                <Typography className={classes.useful}>
                                    Var dette nyttig?
                                </Typography>
                                <Grid
                                    container
                                    direction="row"
                                >
                                <Button
                                    variant="contained"
                                    className={classes.thumbUp}
                                    startIcon={<ThumbUp />}
                                    onClick={() => this.postRating({ id: id, rating: true })}

                                >
                                    Ja
                                </Button>
                                <Typography className={classes.positivRating}>
                                    {positiv}                                
                                </Typography>
                                <Button
                                    variant="contained"
                                    className={classes.thumbDown}
                                    startIcon={<ThumbDown />}
                                    onClick={() => this.postRating({ id: id, rating: false })}
                                >
                                    Nei
                                </Button>
                                    <Typography className={classes.negativRating}>
                                        {negativ}
                                    </Typography>
                                </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    };
    
    public render() {
        return(
            <this.Sporsmal sporsmal={this.props.sporsmal} svar={this.props.svar} positiv={this.props.positiv} negativ={this.props.negativ} id={this.props.id}/>
        );
    }
}


export default SporsmalSvar;