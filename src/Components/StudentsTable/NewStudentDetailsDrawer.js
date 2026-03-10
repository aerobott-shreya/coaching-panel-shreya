import React from "react";
import styles from "./detail.module.css";
import TestEditDialog from "./TestEditDialog";

const NewStudentDetailsDrawer = () => {
  return (
    <div>
        NEW
    </div>
    // <>
    //   <div>
    //     <div style={{ marginTop: "14%" }}>
    //       <div>
    //         <span className={styles.drawerHeading}>Students Details</span>
    //       </div>

    //       <form onSubmit={handleChangePersonalDetails}>
    //         <div style={{ marginTop: "10px" }} className={styles.flexFields}>
    //           <InputField
    //             label="First Name"
    //             value={first_name ? first_name : studentDetails?.first_name}
    //             onChange={handleChange}
    //             name="first_name"
    //           />
    //           <InputField
    //             label="Last Name"
    //             value={last_name ? last_name : studentDetails.last_name}
    //             onChange={handleChange}
    //             name="last_name"
    //           />
    //         </div>

    //         <div className={styles.flexFields}>
    //           <InputField
    //             label="Phone"
    //             name="phone"
    //             type="number"
    //             required
    //             value={phone ? phone : studentDetails?.phone}
    //             onChange={handleChange}
    //           />
    //           <InputField
    //             label="Title"
    //             name="title"
    //             required
    //             onChange={handleChange}
    //             value={title ? title : studentDetails?.title}
    //           />
    //         </div>
    //         <div className={styles.flexFields}>
    //           {/* <InputField label="Age" name="age" onChange={handleChange} /> */}
    //           <LocalizationProvider dateAdapter={AdapterDayjs}>
    //             <DesktopDatePicker
    //               label="DOB"
    //               inputFormat="MM/DD/YYYY"
    //               value={valueD}
    //               onChange={(e) => handleDateChange(e)}
    //               renderInput={(params) => (
    //                 <TextField size="small" name="dob" {...params} />
    //               )}
    //             />
    //           </LocalizationProvider>

    //           <div></div>

    //           <div style={{ width: "48%" }}>
    //             <FormControl fullWidth>
    //               <InputLabel size="small" id="demo-simple-select-label">
    //                 Grade
    //               </InputLabel>
    //               <Select
    //                 labelId="demo-simple-select-disabled-label"
    //                 id="demo-simple-select-disabled"
    //                 value={studentDetails?.grade}
    //                 label="Grade"
    //                 name="grade"
    //                 onChange={(e) => handleChange(e, "userObject")}
    //                 style={{ width: "100%" }}
    //                 size="small"
    //               >
    //                 {gradeList.map((item, idx) => {
    //                   return (
    //                     <MenuItem value={item.id}>
    //                       <em>{item.title}</em>
    //                     </MenuItem>
    //                   );
    //                 })}
    //               </Select>
    //             </FormControl>
    //           </div>
    //         </div>

    //         <div className={styles.flexFields}>
    //           <FormControl>
    //             <FormLabel id="demo-radio-buttons-group-label">
    //               Gender
    //             </FormLabel>
    //             <RadioGroup
    //               aria-labelledby="demo-radio-buttons-group-label"
    //               defaultValue="female"
    //               name="gender"
    //               value={detailState.gender}
    //               sx={{ display: "flex", flexDirection: "row" }}
    //             >
    //               <FormControlLabel
    //                 value="2"
    //                 control={<Radio />}
    //                 label="Female"
    //                 onChange={(e) => handleChange(e, "userObject")}
    //               />
    //               <FormControlLabel
    //                 value="1"
    //                 control={<Radio />}
    //                 label="Male"
    //                 onChange={(e) => handleChange(e, "userObject")}
    //               />
    //             </RadioGroup>
    //           </FormControl>
    //         </div>
    //         <div className={`${styles.alignCenter}`}>
    //           <Button type="submit" size="small" variant="contained">
    //             Update personal details
    //           </Button>
    //         </div>
    //       </form>

    //       <div
    //         style={{ marginBottom: "10px" }}
    //         className={styles.divider}
    //       ></div>
    //       <div style={{ marginBottom: "2%" }}>
    //         <span style={{ padding: "15px", fontSize: "20px" }}>
    //           Guardian Details
    //         </span>
    //       </div>

    //       <form onSubmit={handleChangeGuardianDetails}>
    //         <div className={styles.flexFields}>
    //           <InputField
    //             label="First Name"
    //             name="first_name"
    //             value={guardianDetails?.first_name}
    //             onChange={handleChangeGuardian}
    //           />
    //           <InputField
    //             label="Last Name"
    //             name="last_name"
    //             value={guardianDetails?.last_name}
    //             onChange={handleChangeGuardian}
    //           />
    //         </div>

    //         <div className={styles.flexFields}>
    //           <InputField
    //             label="Mother tongue"
    //             name="mother_tongue"
    //             value={guardianDetails?.mother_tongue}
    //             onChange={handleChangeGuardian}
    //           />
    //           <InputField
    //             label="Parents Monthly Income"
    //             name="income"
    //             type="number"
    //             value={guardianDetails?.income}
    //             onChange={handleChangeGuardian}
    //           />
    //         </div>

    //         <div className={styles.flexFields}>
    //           <InputField
    //             label="Father's Occupation"
    //             name="occupation"
    //             value={guardianDetails?.occupation}
    //             onChange={handleChangeGuardian}
    //           />
    //         </div>
    //         <div className={`${styles.alignCenter}`}>
    //           <Button type="submit" variant="contained" size="small">
    //             Update Guardian Details
    //           </Button>
    //         </div>
    //       </form>

    //       <div
    //         style={{ marginBottom: "10px" }}
    //         className={styles.divider}
    //       ></div>

    //       <div style={{ marginBottom: "2%" }}>
    //         <span style={{ padding: "15px", fontSize: "20px" }}>
    //           Other Details
    //         </span>
    //       </div>

    //       <form onSubmit={handleExtraInfo}>
    //         {/* <div className={styles.flexFields}>
    //             <InputField
    //               label="Likes"
    //               name="likes"
    //               value={extraInfo?.likes}
    //               onChange={handleChangeExtra}
    //             />
    //             <InputField
    //               label="Dislikes"
    //               name="dislikes"
    //               value={extraInfo?.dislikes}
    //               onChange={handleChangeExtra}
    //             />
    //           </div> */}
    //         {/* <div className={styles.flexFields}>
    //             <InputField
    //               label="Dream Career(Self)"
    //               name="dream_career"
    //               multiline={true}
    //               rows={3}
    //               value={extraInfo?.dream_career}
    //               onChange={handleChangeExtra}
    //             />

    //             <InputField
    //               label="Hobbies"
    //               name="hobbies"
    //               value={extraInfo?.hobbies}
    //               onChange={handleChangeExtra}
    //             />
    //              <InputField
    //               label="Sibblings"
    //               name="siblings"
    //               value={extraInfo?.siblings}
    //               onChange={handleChangeExtra}
    //             />
    //           </div> */}

    //         {/* <div className={styles.flexFields}>
               

    //             <InputField
    //               label="Area of Concern"
    //               name="area_of_concern"
    //               value={extraInfo?.area_of_concern}
    //               onChange={handleChangeExtra}
    //             />
    //              <InputField
    //               label="Dream Career"
    //               name="dream_career"
    //               value={extraInfo?.dream_career}
    //               onChange={handleChangeExtra}
    //             />
    //           </div> */}

    //         <div className={styles.flexFields}>
    //           <InputField
    //             label="Strong Academic Subjects"
    //             name="strong"
    //             value={extraInfo?.strong}
    //             onChange={handleChangeExtra}
    //           />
    //           <InputField
    //             label="Weak Academic Subjects"
    //             name="weak"
    //             value={extraInfo?.weak}
    //             onChange={handleChangeExtra}
    //           />
    //         </div>
    //         <div className={styles.flexFields}>
    //           <InputField
    //             label="MG Dream Career"
    //             multiline={true}
    //             rows={3}
    //             name="dream_career"
    //             value={extraInfo?.dream_career}
    //             onChange={handleChangeExtra}
    //           />
    //         </div>

    //         <div
    //           style={{ marginBottom: "10px" }}
    //           className={`${styles.alignCenter}`}
    //         >
    //           <Button type="submit" variant="contained" size="small">
    //             Update Details
    //           </Button>
    //         </div>
    //       </form>

    //       <div
    //         style={{ marginBottom: "10px" }}
    //         className={styles.divider}
    //       ></div>
    //       <div style={{ marginBottom: "2%" }}>
    //         <span style={{ padding: "15px", fontSize: "20px" }}>
    //           Mindgraph Details
    //         </span>
    //       </div>

    //       <form>
    //         <div className={styles.flexFields}>
    //           <Autocomplete
    //             disablePortal
    //             id="combo-box-demo"
    //             onChange={(event, newValue) => {
    //               handleAutoComplete(event, newValue);
    //             }}
    //             options={subjectList}
    //             sx={{ width: 300 }}
    //             renderInput={(params) => (
    //               <TextField {...params} label="Subjects" />
    //             )}
    //           />
    //         </div>
    //         <div style={{ margin: "27px" }}>
    //           <div>
    //             <div>
    //               {/* <DragDrop setBulkFile={setBulkFile} /> */}

    //               {fileName && !file && (
    //                 <p
    //                   style={{
    //                     color: "green",
    //                     margin: "0 auto",
    //                     marginBottom: "10px",
    //                     width: "90%",
    //                   }}
    //                 >
    //                   File {fileName?.name} saved successfully. Please click on
    //                   upload.{" "}
    //                 </p>
    //               )}

    //               {fileName === "" && (
    //                 <div style={{ marginTop: "10px" }}>
    //                   <div
    //                     onDragOver={handleDragOver}
    //                     onDrop={handleDrop}
    //                     className={styles.dropBoxStyles}
    //                   >
    //                     <div
    //                       className={styles.flexStyleDropBox}
    //                       onClick={handleClick}
    //                     >
    //                       <p>
    //                         <img src={dragIcon} alt="dradanddrop" />
    //                       </p>

    //                       <p>Drag & Drop the Files or click here</p>

    //                       <input
    //                         ref={fileInput}
    //                         type="file"
    //                         // id="myfile"

    //                         // name="myfile"

    //                         onChange={handleDrop}
    //                         style={{ display: "none" }}
    //                       ></input>
    //                     </div>
    //                   </div>
    //                 </div>
    //               )}
    //             </div>

    //             {/* <small style={{ color: "#cc0000" }}>
    //                 {errorFlag ? "Excel files exeeds maximum limit" : ""}
    //               </small> */}
    //           </div>
    //         </div>

    //         <div
    //           className={`${styles.alignCenter}`}
    //           onClick={mindGrapherReport}
    //         >
    //           <Button variant="contained" size="small">
    //             Update Mindgraph Details{" "}
    //           </Button>
    //         </div>
    //       </form>

    //       <div
    //         style={{ marginBottom: "10px" }}
    //         className={styles.divider}
    //       ></div>

    //       <div>
    //         <span className={styles.drawerHeading}>Test Status - Online</span>
    //       </div>

    //       <div style={{ marginTop: "10px" }} className={styles.flexFields}>
    //         <InputField
    //           label="Aptitude"
    //           name="aptitude"
    //           value={studentDetails?.aptitude}
    //         />
    //         <InputField
    //           label="Interest"
    //           name="interest"
    //           value={studentDetails?.interest}
    //         />
    //       </div>

    //       <div>
    //         <span className={styles.drawerHeading}>Test Status - Oflline</span>
    //       </div>

    //       <div style={{ marginTop: "10px" }} className={styles.flexFields}>
    //         <InputField
    //           label="Aptitude"
    //           name="aptitude"
    //           value={
    //             studentDetails?.aptitude_offline == true
    //               ? "Completed"
    //               : "Pending"
    //           }
    //         />
    //         <InputField
    //           label="Interest"
    //           name="interest"
    //           value={
    //             studentDetails?.interest_offline == true
    //               ? "Completed"
    //               : "Pending"
    //           }
    //         />
    //       </div>

    //       <div className={styles.btnClasses}>
    //         <TestEditDialog userId={studentDetails?.id} />
    //         {/* <Button variant="contained" onClick={handleUpdateStudentDetails}>
    //             Update Student Details
    //           </Button> */}
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default NewStudentDetailsDrawer;
