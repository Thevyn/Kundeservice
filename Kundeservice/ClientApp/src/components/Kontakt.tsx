import * as React from "react";
import axios from 'axios';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import KontaktStyle from "../styles/KontaktStyle";
import Typography from "@material-ui/core/Typography";
import InputField from "./InputField";
import ConfirmationPopup from "./ConfirmationPopup";

interface IKontaktProps {
    onSubmit: any;
}

interface IKontaktState {
    name: string;
    email: string;
    category: string;
    question: string;
    open: boolean;
    success: boolean;
    emailValid: boolean;
    nameValid: boolean;
    questionValid: boolean;
    errorText: object;
    validForm?: boolean;
}

const kategorier = [
    {
        value: 'Billett',
        label: 'Billett',
    },
    {
        value: 'Admin',
        label: 'Admin',
    },
];

const useStyles = KontaktStyle;


class Kontakt extends React.Component<IKontaktProps, IKontaktState> {
    state = {
        name: "",
        email: "",
        category: "Billett",
        question: "",
        open: false,
        success: false,
        validForm: false,
        emailValid: false,
        nameValid: false,
        questionValid: false,
        errorText: {name: '', email: '', question: ''}
    };


    public handleChange = (e: any) => {
        const {name, value}: any = e.target;
        this.setState({
            [name]: value
        } as any, () => {
            this.validateField(name, value)
        });

    };

    private validateField = (fieldName: string, value: string) => {
        let {errorText, emailValid, nameValid, questionValid} = this.state;
        const epostRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        const navnRegex = /^[a-zA-Z ]{2,30}$/;

        switch (fieldName) {
            case 'email':
                emailValid = epostRegex.test(value);
                errorText.email = emailValid ? '' : 'Eposten er ikke gyldig';
                break;
            case 'name':
                nameValid = (navnRegex.test(value) && value.length >= 3);
                errorText.name = nameValid ? '' : 'Navnet kan kun innholde bokstaver og må være lengre enn 2 bokstaver';
                break;
            case 'question':
                questionValid = value.length >= 10;
                errorText.question = questionValid ? '' : 'Meldingen må være lengre enn 10 bokstaver';
                break;
            default:
                break;
        }
        this.setState({
            errorText: errorText,
            emailValid: emailValid,
            nameValid: nameValid,
            questionValid: questionValid
        }, this.validateForm);
    };

    private validateForm = () => {
        const {nameValid, emailValid, questionValid} = this.state;
        this.setState({validForm: nameValid && emailValid && questionValid});
    };

    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, email, category, question} = this.state;
        const postData = {
            Navn: name,
            Epost: email,
            kategori: category,
            Sporsmal: question
        };
        axios.post('api/Kundeservice/PostSporsmal', postData)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                this.setState({
                    open: true,
                    success: true,
                    name: "",
                    email: "",
                    question: ""
                })
            } else {
                this.setState({
                    open: true,
                    success: false
                })
            }
        }, error => {
            console.log(error);
        });
    };

    public handleClose = () => {
        this.setState({
            open: false
        })
    };

    public renderBody = () => {
        const classes = useStyles();
        const {name, email, errorText, category, question, validForm} = this.state;
        return (
            <div>
                <div className={classes.bakgrunnStil}>
                    <Typography variant="h4" className={classes.title}>Kontakt oss</Typography>
                    <Typography variant="h6" className={classes.title}>Fant du ikke det du lurte på? Send oss en
                        melding</Typography>
                </div>

                <Container maxWidth="sm">
                    <Paper className={classes.root}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <form onSubmit={this.handleSubmit}>
                                <Grid item>
                                    <InputField label="Navn" placeholder="Navn" styles={classes.textField}
                                                handleChange={this.handleChange} value={name} name="name"
                                                error={errorText.name.length !== 0} errorText={errorText.name}
                                                multiline={false} rows="1"
                                    />
                                </Grid>
                                <Grid item>
                                    <InputField label="Epost" placeholder="ola.nordmann@gmail.com"
                                                styles={classes.textField} handleChange={this.handleChange}
                                                value={email} name="email" error={errorText.email.length !== 0}
                                                errorText={errorText.email}
                                                multiline={false} rows="1"
                                    
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-select-subject"
                                        select
                                        label="Emne"
                                        className={classes.textField}
                                        required
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                        value={category}
                                        name="category"
                                    >
                                        {kategorier.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item>
                                    <InputField styles={classes.textField} handleChange={this.handleChange} value={question} name="question" label="Spørsmål" placeholder="Skriv inn spørsmålet ditt"
                                                error={errorText.question.length !== 0}
                                                errorText={errorText.question} multiline={true}
                                                rows="4"
                                    />
                                  
                                </Grid>
                                <Button variant="outlined"
                                        className={classes.textField}
                                        type="submit"
                                        disabled={!validForm}
                                >
                                    Send
                                </Button>
                            </form>
                        </Grid>

                    </Paper>
                </Container>
            </div>
        );
    };

    public render() {
        const {open, success} = this.state;
        return (
            <div>
                <this.renderBody/>
                <ConfirmationPopup
                    open={open}
                    onClose={this.handleClose}
                    message={success ? "Meldingen sendt" : "Meldingen kunne ikke bli sendt, prøv igjen."}
                    variant={success ? "success" : 'error'}
                />
            </div>
        );
    }
}

export default Kontakt;