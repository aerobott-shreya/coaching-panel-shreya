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
import styles from "../../Components/StudentsTable/detail.module.css";
import editIcon from "../../Assets/editR.png";
import viewIcon from "../../Assets/viewR.png";

import { useEffect } from "react";

var sumAp = 0;
var sumInt = 0;
export const TestEditDialogOffline = ({ userId, test_type, ...props }) => {
 
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState("");
  

  const [aptitudeFields, setAptitudeFields] = useState([]);
  const [aptiPost, setAptiPost] = useState([]);
  const [interestFields, setInterestFields] = useState([]);
  const [interestPost, setInterestPost] = useState([]);
  //   const [aptitudeTempState , setAptitudeTempState] = useState([])

  const [totalMarks, setTotalMarks] = useState("");
  const [outOff, setOutOff] = useState("");
  const handleClose = () => {
    setOpen(false);
    setAptiPost([]);
    setInterestPost([]);
  };

  const handleClickOpen = (type) => {
    if (type === "aptitude") {
      api_token
        .get(`/counseling/create_apptitude/?user=${userId}`)
        .then((response) => {
          console.log("getfordropDown", response);

          for (var i of response.data.data[0].offline_result) {
          
          }
          setAptitudeFields(response.data.data[0].offline_result);
          setTotalMarks(response.data.data[0].total_marks);
          // sumAp = response.data.data[0].total_marks

          setOutOff(response.data.data[0].offline_total_out_of);
        })
        .catch((err) => {
          console.log(err);
        });
     
      setType(type);
      setOpen(true);
      return;
    }
    if (type === "interest") {
     

      api_token
        .get(`/counseling/create_interest/?user=${userId}`)
        .then((response) => {
          console.log("InterestResponse", response);
          setInterestFields(response.data.data[0].offline_result);
          setTotalMarks(response.data.data[0].total_marks);
          setOutOff(response.data.data[0].offline_total_out_of);
        })
        .catch((err) => {
          console.log(err);
        });

      setType(type);
      setOpen(true);
      return;
    }
  };

  useEffect(() => {
    setType(test_type);
  }, []);

  const handleAddAptitudeTest = () => {
    setType("aptitudeEdit");
    setOpen(true);
    api_token
      .get(
        `test/result_view/offline_overall/?test_type=aptitude&user=${userId}`
      )
      .then((response) => {
        console.log("getfordropDown", response.data.all_question_breakdown);
        setAptitudeFields(response?.data?.data?.all_question_breakdown);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  const handleAddInterestTest = () => {
    api_token
      .get(`/test/subcategory?test_type=interest`)
      .then((response) => {
        console.log("getfordropDown", response.data.data);
        // setInterestFields(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setType("interestAdd");
    setOpen(true);
  };

  const handleChangeInterest = (e, i) => {
    const { name, value } = e.target;

   

    const newState = [...interestFields];
    newState[i] = {
      ...newState[i],
      marks: value,
    };

    if (name === "total_marks") {
      setTotalMarks(value);
      return;
    }

    if (name === "offline_total_out_of") {
      setOutOff(value);
      return;
    }


    setInterestFields(newState);

    sumInt = sumInt + parseInt(value);
  };

  const handleChange = (e, i) => {
    // e.preventDefault();

    const { name, value } = e.target;
   

    const newState = [...aptitudeFields];
    newState[i] = {
      ...newState[i],
      marks: value,
    };

    if (name === "total_marks") {
      setTotalMarks(value);
      return;
    }

    if (name === "offline_total_out_of") {
      setOutOff(value);
      return;
    }

    
    setAptitudeFields(newState);

    // if(value == ""){
    //   sumAp = 0;
    //   return

    // }

    sumAp = sumAp + parseInt(value);
  };

  const handleUpdateTest = () => {
    let category = [];

    for (var i of aptitudeFields) {
      category.push({
        id: i.category,
        marks: i.marks,
      });
    }

    const data = {
      user: userId,
      total_marks: totalMarks,
      offline_total_out_of: outOff,
      category: category,
    };

   

    api_token
      .patch(`/counseling/create_apptitude/`, data)
      .then((response) => {
        console.log("apihitsucess", response);

        if (response.data.data && response.status == 200) {
          setOpen(false);
          alert("Marks updated successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error!Please try again");
      });

    // api call
  };

  const handleUpdateInterestTest = () => {
    let subcategory = [];

    for (var i of interestFields) {
      subcategory.push({
        id: i.category,
        marks: i.marks,
      });
    }
    const data = {
      user: userId,
      total_marks: totalMarks,
      offline_total_out_of: outOff,
      subcategory: subcategory,
    };
    // api call

    

    api_token
      .patch(`/counseling/create_interest/`, data)
      .then((response) => {
        console.log("interestResponse", response.data.data);
        setOpen(false);
          alert("Marks updated successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Error! Please try again");
      });
  };

  const interestPOP = () => {
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
            {interestFields?.map((e, index) => {
              return (
                <InputField
                  label={e.category}
                  onChange={(e) => handleChangeInterest(e, index)}
                  name="category"
                  value={e.marks}
                />
              );
            })}
            <InputField
              label="Total Marks"
              name="total_marks"
              onChange={handleChangeInterest}
              value={totalMarks}
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

  const aptitudePOP = () => {
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
            {aptitudeFields?.map((e, index) => {
              return (
                <InputField
                  label={e.category}
                  onChange={(e) => handleChange(e, index)}
                  name="category"
                  value={e.marks}
                />
              );
            })}

            {/* <InputField/>

            <InputField/>

            <InputField/> */}
            <InputField
              label="Total Marks"
              name="total_marks"
              value={totalMarks}
              onChange={handleChange}
            />
            <InputField
              label="Out Off"
              name="offline_total_out_of"
              value={outOff}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button onClick={handleUpdateTest} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      {/* <Button
        variant="outlined"
        size="small"
        sx={{
          textTransform: "none",
          minWidth: "115px",
        }}
        onClick={() => handleClickOpen(test_type)}
      >
       <img src={editIcon}  alt="editIcon"  width={15} />
      </Button> */}

      <div>
        <img
          src={editIcon}
          alt="editIcon"
          width={20}
          onClick={() => handleClickOpen(test_type)}
          style={{ cursor: "pointer" }}
        />
      </div>

      {type === "aptitude" && aptitudePOP()}
      {type === "interest" && interestPOP()}
    </>
  );
};
