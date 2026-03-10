import React from "react";
import {
  AddOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeSharp,
} from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";

import styles from "../index.module.css";
import SearchAutocomplete from "../../../Component/SearchAutocomplete";

export default function BatchSingleView({
  batchEditEnabled = false,
  setBatchEditEnabled = () => {},
  batchData = {},
  setBatchData = () => {},
  batchSelected = {},
  setBatchSelected = () => {},
  setVariantData = () => {},
  setVariantSelected = () => {},
  setSidebarMenuSelected = () => {},
  setVariantEditEnabled = () => {},
  boardOptions = [],
  gradeOptions = [],
  instructorOptions = [],
  sessionOptions = [],
  subjectOptions = [],
  batchFormHandler = () => {},
  getVariantData = () => {},
  userType = 0,
  goToPath = () => {},
}) {
  return (
    <div className={styles.mainContent}>
      {!batchEditEnabled && (
        <HomeSharp
          onClick={() => (goToPath("/batches"), setBatchSelected({}))}
          className={styles.homeBtn}
        />
      )}
      <div className={styles.viewBatch}>
        <div className={styles.batchStart}>
          {batchEditEnabled ? (
            <Button
              onClick={() => (setBatchData({}), setBatchEditEnabled(false))}
              variant="text"
              style={{ fontSize: "1.2rem" }}
            >
              Cancel
            </Button>
          ) : (
            <div className={styles.batchTextContainer}>
              <h4 className={styles.batchTitle}>{batchSelected.title}</h4>
              <p className={styles.batchText}>
                {batchSelected.instructors?.length > 0 &&
                  batchSelected.instructors[0].first_name +
                    " " +
                    batchSelected.instructors[0].last_name}{" "}
                <br />
                {batchSelected.session?.title}
              </p>
            </div>
          )}
          {batchEditEnabled ? (
            <Button
              color="primary"
              onClick={() => batchFormHandler(batchData, 2)}
              variant="contained"
              style={{ textTransform: "none", padding: "0.4rem 2.2rem" }}
            >
              DONE
            </Button>
          ) : (
            userType !== 2 && (
              <div
                onClick={() => (
                  setBatchData({
                    ...batchSelected,
                    subject:
                      batchSelected.subject?.length > 0
                        ? batchSelected.subject[0]
                        : {},
                    instructor:
                      batchSelected.instructors?.length > 0
                        ? {
                            id: batchSelected.instructors[0].id,
                            title:
                              batchSelected.instructors[0].first_name +
                              " " +
                              batchSelected.instructors[0].last_name,
                          }
                        : {},
                  }),
                  setBatchEditEnabled(true)
                )}
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <EditOutlined style={{ marginRight: 6, fontSize: 14 }} />
                <span
                  style={{
                    fontSize: 17,
                    letterSpacing: "0.15rem",
                    fontWeight: "500",
                  }}
                >
                  EDIT
                </span>
              </div>
            )
          )}
        </div>
        <div style={{ width: "50%", marginTop: "2%" }}>
          {!batchEditEnabled && (
            <SearchAutocomplete
              searchFor="Variant"
              options={
                batchSelected.validity?.length ? batchSelected.validity : []
              }
              onChange={(e, variant) => setVariantSelected(variant)}
              styles={styles}
            />
          )}
        </div>
        <h3 className={styles.batchDetailsHeader}>Batch Details</h3>
        <div className={styles.batchDetails}>
          <div className={styles.batchType}>
            {batchEditEnabled && <h4>Name</h4>}
            <h4>Grade</h4>
            <h4>Board</h4>
            <h4>Subject</h4>
            <h4>Type</h4>
          </div>
          <div className={styles.batchData}>
            {batchEditEnabled ? (
              <div style={{ width: "60%" }}>
                <TextField
                  required
                  id="outlined-required"
                  // label="Batch Name"
                  // variant="outlined"
                  name="name"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setBatchData({ ...batchData, title: e.target.value })
                  }
                  value={batchData.title}
                  style={{ marginTop: 15 }}
                  // error={errors.title ? true : false}
                  // helperText={errors.showError && errors.title}
                />
                <Autocomplete
                  disableClearable
                  disablePortal
                  blurOnSelect
                  selectOnFocus
                  size="small"
                  options={subjectOptions}
                  getOptionLabel={(option) => option.title || ""}
                  onChange={(e, v) =>
                    setBatchData({ ...batchData, subject: v })
                  }
                  value={batchData.subject}
                  renderInput={(params) => (
                    <TextField {...params} required placeholder="Subject" />
                  )}
                  closeIcon={null}
                  style={{ marginTop: 15 }}
                />
                <Autocomplete
                  disableClearable
                  disablePortal
                  blurOnSelect
                  selectOnFocus
                  size="small"
                  options={gradeOptions}
                  getOptionLabel={(option) => option.title || ""}
                  onChange={(e, v) => setBatchData({ ...batchData, grade: v })}
                  value={batchData.grade}
                  renderInput={(params) => (
                    <TextField {...params} required placeholder="Grade" />
                  )}
                  closeIcon={null}
                  style={{ marginTop: 15 }}
                />
                <Autocomplete
                  disableClearable
                  disablePortal
                  blurOnSelect
                  selectOnFocus
                  size="small"
                  options={boardOptions}
                  getOptionLabel={(option) => option.title || ""}
                  onChange={(e, v) => setBatchData({ ...batchData, board: v })}
                  value={batchData.board}
                  renderInput={(params) => (
                    <TextField {...params} required placeholder="Board" />
                  )}
                  closeIcon={null}
                  style={{ marginTop: 15 }}
                />
                <Autocomplete
                  disableClearable
                  disablePortal
                  blurOnSelect
                  selectOnFocus
                  size="small"
                  options={sessionOptions}
                  getOptionLabel={(option) => option.title || ""}
                  onChange={(e, v) =>
                    setBatchData({ ...batchData, session: v })
                  }
                  value={batchData.session}
                  renderInput={(params) => (
                    <TextField {...params} required placeholder="Session" />
                  )}
                  closeIcon={null}
                  style={{ marginTop: 15 }}
                />
              </div>
            ) : (
              <>
                <h4>{batchSelected.grade?.title}</h4>
                <h4>{batchSelected.board?.title}</h4>
                <h4>
                  {batchSelected.subject?.length > 0
                    ? batchSelected.subject[0].title
                    : "-"}
                </h4>
                <h4>{batchSelected.session?.title}</h4>
              </>
            )}
          </div>
        </div>
        <br />
        <div className={styles.batchDetails}>
          <div className={styles.batchType}>
            <h4>Instructor</h4>
            {!batchEditEnabled && batchSelected.address?.line_1 && (
              <h4>Address</h4>
            )}
          </div>
          <div className={styles.batchData}>
            {batchEditEnabled ? (
              <Autocomplete
                disableClearable
                disablePortal
                blurOnSelect
                selectOnFocus
                size="small"
                options={instructorOptions}
                getOptionLabel={(option) => option.title || ""}
                onChange={(e, v) =>
                  setBatchData({ ...batchData, instructor: v })
                }
                value={batchData.instructor}
                renderInput={(params) => (
                  <TextField {...params} required placeholder="Instructor" />
                )}
                closeIcon={null}
                style={{ marginTop: 15, width: "60%" }}
              />
            ) : (
              <>
                <h4>
                  {batchSelected.instructors?.length > 0 &&
                    batchSelected.instructors[0].first_name +
                      " " +
                      batchSelected.instructors[0].last_name}
                </h4>
                {batchSelected.address?.line_1 && (
                  <h4>
                    {batchSelected.address?.line_1}{" "}
                    {batchSelected.address?.line_2}{" "}
                    {batchSelected.address?.landmark}{" "}
                    {batchSelected.address?.city} -{" "}
                    {batchSelected.address?.zipcode}{" "}
                    {batchSelected.address?.state}{" "}
                    {batchSelected.address?.country}
                  </h4>
                )}
              </>
            )}
          </div>
        </div>
        {!batchEditEnabled && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className={styles.variantHeader}>Variants</h3>
            {userType !== 2 && (
              <div
                onClick={() => (
                  setVariantEditEnabled(true),
                  setVariantData({ create: true }),
                  setVariantSelected({ id: -1 }),
                  goToPath(`/batches/${batchSelected.id}/-1`),
                  setSidebarMenuSelected("Overview")
                )}
                className={styles.addVariant}
              >
                <AddOutlined style={{ fontSize: "0.8rem" }} /> Add Variant
              </div>
            )}
          </div>
        )}
        {!batchEditEnabled &&
          batchSelected.validity?.length > 0 &&
          batchSelected.validity.map((vrnt) => (
            <div
              key={vrnt.id}
              className={styles.variant}
              style={{ backgroundColor: vrnt.colour }}
            >
              <div
                onClick={() => (
                  goToPath(`/batches/${batchSelected.id}/${vrnt.id}`),
                  setVariantSelected(vrnt)
                )}
                style={{ width: "100%", cursor: "pointer", padding: "2%" }}
              >
                <h3>{vrnt.title}</h3>
                <p>{vrnt.is_expired ? "Expired" : "Active"}</p>
              </div>
              {userType !== 2 && (
                <div style={{ display: "flex" }}>
                  <DeleteOutlined
                    onClick={() => getVariantData(vrnt.id, true)}
                    className={styles.variantIcon}
                  />
                  <EditOutlined
                    onClick={() => (
                      setVariantData({
                        ...vrnt,
                        startTime: moment(vrnt.start_time, "HH:mm:ss"),
                        endTime: moment(vrnt.end_time, "HH:mm:ss"),
                      }),
                      setVariantSelected(vrnt),
                      setVariantEditEnabled(true),
                      goToPath(`/batches/${batchSelected.id}/${vrnt.id}`),
                      setSidebarMenuSelected("Overview")
                    )}
                    className={styles.variantIcon}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
