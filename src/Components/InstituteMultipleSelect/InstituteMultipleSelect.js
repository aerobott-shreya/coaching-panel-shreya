import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let sample = [];

export default function InstituteMultipleSelect({
  size,
  label,
  namesArray,
  name,
  callBack,
  value,
  onChange,
  ...props
}) {
  const [personName, setPersonName] = React.useState([]);

  const [arrayIds, setArrayIds] = React.useState([]);



  const handleChange = (event) => {
  
    const {
      target: { value },
    } = event;

    if (name === "institute") {
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );

      let newPerson = [];

      for (var i of value) {
     
        newPerson.push(
          namesArray[namesArray.findIndex((item) => item.name == i)]?.id
        );
      }
      callBack("institute", newPerson);

      return;
    }
  };



  return (
    <div>
      <FormControl 
      // sx={{ width:"50%" }}
      fullWidth
      >
        <InputLabel size={size} id="demo-multiple-checkbox-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          size={size}
          value={personName}
          name={name}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {namesArray.map((name) => (
            <MenuItem key={name.id} value={name.name}>
              <Checkbox checked={personName.indexOf(name.name) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
