import { Details } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { api_token } from "../../Utils/Network";
import InputField from "../Input/InputField";
import styles from "./detail.module.css";

var sumAp = 0;
var sumInt = 0;
const TestEditDialog = ({ userId, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState("");

  const [aptitudeFields, setAptitudeFields] = useState([]);
  const [aptiPost, setAptiPost] = useState([]);
  const [interestFields, setInterestFields] = useState([]);
  const [interestPost, setInterestPost] = useState([]);

  const [totalMarks, setTotalMarks] = useState("");
  const [outOff, setOutOff] = useState("");
  const handleClose = () => {
    setOpen(false);
    setAptiPost([]);
    setInterestPost([]);
  };

  const handleClickOpen = (type) => {
    setType("selection");
    setOpen(true);
  };

  const handleAddAcademicTest = () => {};

  const handleAddAptitudeTest = () => {
    setType("aptitudeAdd");

    api_token
      .get(`/test/category?test_type=aptitude`)
      .then((response) => {
        console.log("getfordropDown", response.data.data);
        setAptitudeFields(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
  };

  const handleAddInterestTest = () => {
    api_token
      .get(`/test/subcategory?test_type=interest`)
      .then((response) => {
        console.log("getfordropDown", response.data.data);
        setInterestFields(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setType("interestAdd");
    setOpen(true);
  };

  const handleChangeInterest = (e) => {
    const { name, value } = e.target;

    if (name === "total_marks") {
      setTotalMarks(value);
      return;
    }

    if (name === "offline_total_out_of") {
      setOutOff(value);
      return;
    }

    setInterestPost([
      ...interestPost,
      {
        id: name,
        marks: value,
      },
    ]);

    sumInt = sumInt + parseInt(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "total_marks") {
      setTotalMarks(value);
      return;
    }

    if (name === "offline_total_out_of") {
      setOutOff(value);
      return;
    }

    // setAptitudeFields([
    //   ...aptitudeFields,
    //   {
    //     id: name,
    //     marks: value,
    //   },
    // ]);

    setAptiPost([
      ...aptiPost,
      {
        id: name,
        marks: value,
      },
    ]);
    sumAp = sumAp + parseInt(value);
  };

  const handleUpdateTest = (e) => {
    e.preventDefault();
    let validateFields = false;

    const data = {
      user: userId,
      total_marks: totalMarks,
      offline_total_out_of: outOff,
      category: aptiPost,
    };

    {
      data.category.length !== 0
        ? api_token
            .post(`/counseling/create_apptitude/`, data)
            .then((response) => {
              console.log("apihitsucess", response);
              alert(response?.data?.data?.message);
            })
            .catch((err) => {
              console.log(err);
              alert("Error!Please try again");
            })
        : alert("Please enter all fields");
    }

   

    // api call
  };

  const handleUpdateInterestTest = () => {
    const data = {
      user: userId,
      total_marks: totalMarks,
      offline_total_out_of: parseInt(outOff),
      subcategory: interestPost,
    };
    // api call

    

    api_token
      .post(`/counseling/create_interest/`, data)
      .then((response) => {
        console.log("interestResponse", response.data.data);
        alert(response?.data?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        alert("Error! Please try again");
      });
  };

  const addInterestDetails = () => {
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
              //   className={styles.font20}
              style={{ display: "flex", flexDirection: "column", marginBottom : "10px" }}
            >
              <span>Add/Edit Interest test results</span>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {interestFields?.map((e) => {
              return (
                <InputField
                  label={e.title}
                  onChange={handleChangeInterest}
                  name={e.id}
                />
              );
            })}
            <InputField
              label="Total Marks"
              name="total_marks"
              value={totalMarks}
              onChange={handleChangeInterest}
            />
            <InputField
              label="Out Off"
              name="offline_total_out_of"
              onChange={handleChangeInterest}
              value={outOff}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button onClick={handleUpdateInterestTest} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const addAptitudeDetails = () => {
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
        <form onSubmit={handleUpdateTest}>
          <DialogTitle id="alert-dialog-title">
            <div>
              <div
                //   className={styles.font20}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span>Add/Edit Aptitude test results</span>
              </div>
            </div>
          </DialogTitle>

          <DialogContent>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {aptitudeFields?.map((e) => {
                return (
                  <InputField
                    label={e.title}
                    onChange={handleChange}
                    name={e.id}
                    required
                  />
                );
              })}
              <InputField
                label="Total Marks"
                name="total_marks"
                value={totalMarks}
                onChange={handleChange}
              />
              <InputField
                label="Out Off"
                name="offline_total_out_of"
                onChange={handleChange}
                value={outOff}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
            <Button type="submit" autoFocus>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const selectionType = () => {
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
              //   className={styles.font20}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span>Select test to add details</span>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <Button variant="contained" onClick={handleAddAptitudeTest}>
              Add/edit Aptitude test details
            </Button>
            <Button variant="contained" onClick={handleAddInterestTest}>
              Add/edit Interest details
            </Button>

            <Button variant="contained" onClick={handleAddAcademicTest}>
              Add/edit Academic details
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button onClick={handleClose} autoFocus>
            Update
          </Button> */}
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{
          // textTransform: "none",
          minWidth: "115px",
        }}
        onClick={() => handleClickOpen("selection")}
      >
        Add/Edit test Details
      </Button>

      {type === "selection" && selectionType()}
      {type === "aptitudeAdd" && addAptitudeDetails()}
      {type === "interestAdd" && addInterestDetails()}
    </>
  );
};

export default TestEditDialog;

const validateFunction = (data, aptiPost) => {
  // let category = data?.category;
  const { category } = data;
  
  if (category.length == 0) {
    return false;
  } else {
    for (var i = 0; i < 14; i++) {
      if (Object.keys(category[i]).length == 0) {
        return false;
      }
    }
    return true;
  }


};
