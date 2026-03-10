import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../Input/InputField";
import styles from "./testedit.module.css";
import edit from "../../Assets/pen.svg";

const TestEditDialogBox = ({ editTest, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState("");
  const { view_result } = editTest;
  const { all_question_breakdown } = view_result;

  const [fields, setFields] = useState(all_question_breakdown);

  console.log("fields", fields);

  useEffect(() => {}, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (type) => {
    console.log("^^^");
    setType("aptitude");
    setOpen(true);
  };

  const handleChangeAptitute = (e, i) => {
    const { name, value } = e.target;

    console.log("QAZXSW", name, value);

    const newState = [...fields];
    newState[i] = {
      ...newState[i],
      percent: value,
    };

    setFields(newState);
  };

  const handleUpdateOnlineAptitude = () => {
    let data = [];

    for (var i of fields) {
      console.log("kkkkk", i);
      data.push({
        id: i,
      });
    }
  };

  console.log("edittest111", all_question_breakdown);
  const aptitudeEdit = () => {
    console.log("&&");
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            minWidth: "650px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <div
              className={styles.font20}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span>Test Name</span>
              <span>{editTest.test_name}</span>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className={styles.flexTestFields}>
            {fields?.map((test, index) => {
              return (
                <div>
                  <span>
                    <InputField
                      label={test.breakdown}
                      name="percent"
                      value={test.percent}
                      onChange={(e) => handleChangeAptitute(e, index)}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button onClick={handleUpdateOnlineAptitude} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        sx={{
          textTransform: "none",
          minWidth: "115px",
          border: "none",
        }}
        onClick={() => handleClickOpen(type)}
      >
        <img src={edit} alt="edit" width="20px" />
      </Button>

      {type === "aptitude" && aptitudeEdit()}
    </>
  );
};

export default TestEditDialogBox;
