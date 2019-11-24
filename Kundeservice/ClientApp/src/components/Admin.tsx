import React from 'react';
import axios from 'axios';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AdminStyle from "../styles/AdminStyle";
import CardHeader from "@material-ui/core/CardHeader";
import Svar from "./Svar";


interface IAdmin {
    sporsmal: ISporsmalProps[];
    svar: string;
}

interface ISporsmalProps {
    id: number;
    sporsmal: string;
    navn: string;
    kategori: string;
    epost: string;
}

const useStyles = AdminStyle;


class Admin extends React.Component<{}, IAdmin> {
    constructor(props: any) {
        super(props);
        this.state = {
            sporsmal: [],
            svar: ''
        };
    }

    componentDidMount(): void {
        this.fetchSporsmal();
    }

    public fetchSporsmal = () => {
        axios.get('api/Kundeservice/HentInnsendteSporsmal')
            .then(response => {
                this.setState({
                    sporsmal: response.data
                });
            }, error => {
            alert('Kunne ikke hente spørsmål')
        });
        
    };
    
    public renderHeader = () => {
        const classes = useStyles();
        return (
            <div className={classes.bakgrunnStil}>
                <Typography variant="h4" className={classes.title}>Administrasjon</Typography>
                <Typography variant="h6" className={classes.title}>Spørsmålene du svarer på havner på forsiden</Typography>
            </div>
        );
    };

    public Sporsmal = () => {
        const classes = useStyles();
        return (
            <Card>
                <CardHeader title="Innsendte spørsmål" className={classes.cardHeader}/>
                <CardContent>
                    {this.state.sporsmal.map((data) => {
                        return (
                            <div className={classes.root} key={data.id}> 
                            <ExpansionPanel >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div>
                                        <div>
                                            <Typography className={classes.heading}>{data.sporsmal}</Typography>
                                        </div>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Typography variant="subtitle2">Innsendt av: <br/>{data.navn}
                                                <br/>{data.epost}</Typography>
                                            <Typography variant="subtitle2">Kategori: {data.kategori}</Typography>
                                        </Grid>
                                        <Svar id={data.id} fetchSporsmal={this.fetchSporsmal} kategori={data.kategori} sporsmal={data.sporsmal}/>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        );
    };

    public render() {
        return (
            <div>
                <this.renderHeader/>
                <Container maxWidth="md">
                    <this.Sporsmal/>
                </Container>
            </div>
        );
    }
}

export default Admin;