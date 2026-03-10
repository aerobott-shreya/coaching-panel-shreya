import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function AutoCompleteField({options, label, onChange}) {
    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </div>
    )
}

export default AutoCompleteField;
