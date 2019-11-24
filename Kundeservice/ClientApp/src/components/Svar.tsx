import React, {useState} from 'react';
import axios from 'axios';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import ConfirmationPopup from "./ConfirmationPopup";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import InputField from "./InputField";


interface ISporsmalSvarProps {
    id?: number;
    kategori: string;
    sporsmal: string;
    fetchSporsmal: () => void;

}

const useStyles = makeStyles({
    textfield: {
        width: 800,

    },
    container: {
        padding: '0 1rem 0 0.5rem'
    },
    deleteButton: {
        marginLeft: '1rem',
        color: '#f44336',

    }
});

const Svar = ({id, fetchSporsmal, kategori, sporsmal}: ISporsmalSvarProps) => {
    const classes = useStyles();
    const [svar, setSvar] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [valid, setValid] = useState(false);
    const [svarValid, setSvarValid] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleSvarChange = (event: any) => {
        event.persist();
        const svarValid = event.target.value.length !== 0;
        setErrorText(svarValid ? '' : 'Vennligst skriv inn et svar');
       
        setSvar(event.target.value);
        setSvarValid(svarValid);
       
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const postData = {
            id: id,
            sporsmal: sporsmal,
            kategori: kategori,
            svar: svar
        };
        axios.post('api/Kundeservice/PostSvar', postData).
        then(res => {
            if (res.status >= 200 && res.status < 300) {
                setOpen(true);
                setValid(true);

            } else {
                setOpen(true);
                setValid(false);
            }
        }, error => {
            console.log(error);
        });
    };

    const handleClose = () => {
        setOpen(false);
        setOpenDialog(false);
        fetchSporsmal();
    };

    const confirmDelete = () => {
        setOpenDialog(true);
    };

    const deleteSporsmal = () => {
        axios.delete(`api/Kundeservice/${id}`)
       .then(res => {
            if (res.status >= 200 && res.status < 300) {
                handleClose();
            } else {
                alert("Noe gikk galt");
            }
        }, error => {
           console.log(error)
       });
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <InputField styles={classes.textfield} 
                            handleChange={handleSvarChange} value={svar} 
                            name="svar" label="Svar" placeholder="Skriv inn svar" 
                            error={errorText.length !== 0} errorText={errorText} multiline={true} rows="4"/>
            
                <Button variant="outlined" type="submit" color="primary" disabled={!svarValid}>Send Svar</Button>
                <Button variant="outlined" className={classes.deleteButton} onClick={confirmDelete}>Slett
                    spørsmål</Button>

            </form>
            
                <ConfirmationPopup
                    onClose={handleClose}
                    open={open}
                    message={valid ? "Svaret ble lagret" : "Svaret kunne ikke bli lagret"}
                    variant={valid ? "success" : 'error'}
                />

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-delete"
                aria-describedby="alert-dialog-question"
            >
                <DialogTitle id="alert-dialog-title">{"Er du sikker på at du vil slette dette spørsmålet?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Nei
                    </Button>
                    <Button onClick={deleteSporsmal} className={classes.deleteButton} autoFocus>
                        Ja
                    </Button>
                </DialogActions>
            </Dialog>
        
        </div>
    )
};

export default Svar;