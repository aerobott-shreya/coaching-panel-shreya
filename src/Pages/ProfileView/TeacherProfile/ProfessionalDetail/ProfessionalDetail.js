import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import School from "../../../../Assets/schoolz.png";
import AddIcon from "@mui/icons-material/Add";
import DialogBox from "../../../../Components/DialogBox/DialogBox";
import InputField from "../../../../Components/Input/InputField";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { api_token } from "../../../../Utils/Network";

function ProfessionalDetail({ access, userState, getData = () => {} }) {
  const [addressClick, setAddressClick] = useState(false);
  const [educationDetail, setEducationDetail] = useState({
    id: "",
    degree: "",
    specialization: "",
    institute: "",
    passing_year: "",
    on_going: false,
    marks: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closeData = () => {
    // debugger;
    setAddressClick(false);
  };

  console.log(userState?.education?.id, "nenwjuhdounsjhijfd");

  const handleToggle = (e) => {
    setEducationDetail({ ...educationDetail, on_going: e.target.checked });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationDetail({ ...educationDetail, [name]: value });
    console.log(educationDetail, "educationDetail12121");
  };

  const handeleAdd = (id, v) => {
    console.log(id, v, "educationDetail12121-2872");
    setEducationDetail({ ...v });
    setAddressClick(true);
  };

  const handleNew = () => {
    setAddressClick(true);
    setEducationDetail({
        id: '',
        degree: '',
        specialization: '',
        institute: '',
        passing_year: '',
        on_going: false,
        marks: '',
    });
  };

  const handleProfSubmit = () => {
    let data = { ...educationDetail, user: userState?.id };
    console.log(data, "educationDetail223");
    if (data?.on_going) {
      data.passing_year = "";
    }

    if (data?.id == "") {
      delete data.id;
    }
    if (educationDetail?.id == "") {

        console.log(data, "hitpost");
      api_token
        .post(`profile/v1/education/`, { ...data })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            alert("Professional Details added Successfully");
            getData();
            setAddressClick(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {

        console.log(data, "hitpatch");
      api_token
        .patch(`profile/v1/education/${educationDetail?.id}/`, {
          ...data,
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            alert("Professional Details Updated Successfully");
            getData();
            setAddressClick(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        {/* {access?.updateAccess &&  */}

        <div className={styles.addIcons} onClick={() => handleNew()}>
          <AddIcon /> Add Profession Details
        </div>
        {/* } */}
        {userState?.education.length > 0 ? (
          <>
            {userState?.education?.map((v, i) => (
              <div className={styles.mainBox}>
                <div style={{ margin: "10px" }}>
                  <img src={School} alt="school" />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <p className={styles.textData}>Studied At {v?.institute}</p>
                  <p className={styles.textData}>{`${v?.degree} ${
                    v?.specialization && `in ${v?.specialization}`
                  }. ${v?.passing_year && `Class of ${v?.passing_year}`} `}</p>
                </div>
                <div className={styles.editIconContainer}>
                  {v?.on_going && <p style={{ color: "#216E91" }}>Pursuing</p>}

                  {/* {access?.updateAccess &&  */}

                  <EditIcon
                    onClick={(e) => handeleAdd(v.id, v)}
                    className={styles.editIconCon}
                  />
                  {/* // }  */}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No Professional Details</div>
        )}
      </div>
      <DialogBox
        open={addressClick}
        title="Profession Detail"
        onClose={() => closeData()}
        dataSend={handleProfSubmit}
      >
        <div className={styles.mainData}>
          <div className={styles.boxContent}>
            <InputField
              value={educationDetail?.degree}
              name="degree"
              label="Degree"
              onChange={handleChange}
            />
          </div>
          <div className={styles.boxContent}>
            <InputField
              value={educationDetail?.specialization}
              name="specialization"
              label="Specialization"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.mainData}>
          <div className={styles.boxContent}>
            <InputField
              value={educationDetail?.institute}
              name="institute"
              label="Institute"
              onChange={handleChange}
            />
          </div>
          <div className={styles.boxContent}>
            <InputField
              value={educationDetail?.marks}
              name="marks"
              label="Marks"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.boxContent}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleToggle}
                checked={educationDetail?.on_going}
              />
            }
            label="On Going"
          />

          {!educationDetail?.on_going && (
            <InputField
              name="passing_year"
              value={educationDetail?.passing_year}
              label="Passing Year"
              onChange={handleChange}
            />
          )}
        </div>
      </DialogBox>
    </>
  );
}

export default ProfessionalDetail;
