import React from 'react';
import TextField from "@material-ui/core/TextField";

interface InputProps {
    styles: string;
    handleChange: (e: any) => void;
    value: string;
    name: string;
    label: string;
    placeholder: string;
    error: boolean;
    errorText: string;
    multiline: boolean;
    rows: string;
}

const InputField = ({ label, placeholder, name, styles, handleChange, value, error, errorText, multiline, rows} : InputProps) => {
    return (
    <TextField
        id="outlined-full-width"
        label={label}
        placeholder={placeholder}
        fullWidth
        rows={rows}
        multiline={multiline}
        className={styles}
        margin="normal"
        error={error}
        helperText={errorText}
        InputLabelProps={{
            shrink: true,
        }}
        variant="outlined"
        onChange={handleChange}
        value={value}
        name={name}
    >
    </TextField>
    );
};

export default InputField;