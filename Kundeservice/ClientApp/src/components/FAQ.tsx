import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SporsmalSvar from "./SporsmalSvar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Container from "@material-ui/core/Container";
import FAQStyle from "../styles/FAQStyle";


interface IFaq {
    sporsmal: ISporsmalSvarProps[];
    kategori: string;
    filtrert: ISporsmalSvarProps[];

}

interface ISporsmalSvarProps {
    id: number;
    sporsmal: string;
    svar: string;
    positivRating: number;
    negativRating: number;
}

const useStyles = FAQStyle;

class FAQ extends React.Component<{}, IFaq> {
    constructor(props: any) {
        super(props);
        this.state = {
            sporsmal: [],
            filtrert: [],
            kategori: 'Alle'
        };
    }

    public componentDidMount() {
        this.fetchSporsmal();
    }

    public fetchSporsmal = () => {
        axios.get('api/Kundeservice/HentAlleSporsmal')
            .then(response => {
                this.setState({
                    sporsmal: response.data,
                    filtrert: response.data,
                    kategori: "Alle"
                });
            }, error => {
                console.log(error);
                alert('Kunne ikke hente spørsmålene')
            });
    };

    public fetchKategoriSporsmal = (kategori: string) => {
        axios.get(`api/Kundeservice/HentKategoriSporsmal?kategori=${kategori}`)
            .then(response => {
                this.setState({
                    sporsmal: response.data,
                    filtrert: response.data,
                    kategori: kategori
                });
            }, error => {
                console.log(error);
                alert('Kunne ikke hente spørsmålene')
            });
    };

    public handleCategory = () => {
        switch (this.state.kategori) {
            case "Alle":
                return this.fetchSporsmal();
            case "Billett":
                return this.fetchKategoriSporsmal("Billett");
            case "Admin":
                return this.fetchKategoriSporsmal("Admin");
        }
    };

    public handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let sporsmalListe = [];
        let nySporsmalListe = [];

        if (e.target.value !== "") {
            sporsmalListe = this.state.sporsmal;
            nySporsmalListe = sporsmalListe.filter(sporsmal => {
                const lc = sporsmal.sporsmal.toLowerCase();
                const filter = e.target.value.toLowerCase();

                return lc.includes(filter);
            });
        } else {
            nySporsmalListe = this.state.sporsmal;
        }
        this.setState({
            filtrert: nySporsmalListe
        });
    };

    public renderHeader = () => {
        const classes = useStyles();
        return (
            <div className={classes.bakgrunnStil}>
                <Typography variant="h4" className={classes.title}>Hvordan kan jeg hjelpe deg?</Typography>
                <form>
                    <Paper className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Hva lurer du på?"
                            inputProps={{'aria-label': 'Hva lurer du på'}}
                            onChange={this.handleSearch}
                        />
                    </Paper>
                </form>
            </div>
        );
    };

    public renderSporsmal = () => {
        const sortertArray = [...this.state.filtrert].sort((a, b) => ((b.negativRating + b.positivRating) > (a.negativRating + a.positivRating) ? 1 : -1));
        return (
            <div>
                {sortertArray.map((data) => {
                    return (
                        <SporsmalSvar id={data.id} svar={data.svar} key={data.id} sporsmal={data.sporsmal}
                                      positiv={data.positivRating} negativ={data.negativRating}
                                      fetchSporsmal={this.handleCategory}/>
                    );
                })}
            </div>
        );
    };

    public renderButtons = () => {
        const classes = useStyles();
        return (
            <div className={classes.categoryButtons}>
                <Button variant="outlined"
                        onClick={() => this.fetchSporsmal()}
                        className={classes.buttonStyle}>Alle</Button>
                <Button variant="outlined"
                        onClick={() => this.fetchKategoriSporsmal("Billett")}
                        className={classes.buttonStyle}>Billett</Button>
                <Button variant="outlined"
                        onClick={() => this.fetchKategoriSporsmal("Admin")}
                        className={classes.buttonStyle}>Admin</Button>
                <Typography variant="h4" className={classes.categoryTitle}>{this.state.kategori}</Typography>
            </div>
        );
    };

    public render() {
        return <div>
            <this.renderHeader/>
            <Container>
                <Card>
                    <CardHeader title="FAQ"/>
                    <CardContent>
                        <this.renderButtons/>
                        <this.renderSporsmal/>
                    </CardContent>
                </Card>
            </Container>
        </div>;
    }
}

export default FAQ;


