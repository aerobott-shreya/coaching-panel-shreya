import React from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import { ArrowBackSharp } from "@material-ui/icons";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import moment from "moment";

import styles from "../index.module.css";
import goLiveBtnHandler from "../../../Utils/CommonFunctions";

export default function VariantOverview({
  batchSelected = {},
  variantEditEnabled = false,
  setVariantEditEnabled = () => { },
  variantData = {},
  setVariantData = () => { },
  variantSelected = {},
  setVariantSelected = () => { },
  colorOptions = [],
  batchFormHandler = () => { },
  userType = 0,
  goLiveHandler = () => {},
  goBack = () => {},
  goToPath = () => {},
}) {
  return (
    <div className={styles.mainContent}>
      <div className={styles.stud_attend_title}>
        {variantEditEnabled ? (
          <Button
            onClick={() => {
              if (variantSelected.id === -1) {
                setVariantSelected({});
                goToPath("/batches/" + batchSelected.id);
              }
              setVariantData({});
              setVariantEditEnabled(false);
            }}
            variant="text"
            style={{ fontSize: "1.2rem" }}
          >
            Cancel
          </Button>
        ) : (
          <h2 className={styles.variantTitle}>
            <ArrowBackSharp onClick={goBack} className={styles.goBack} />
            {variantSelected.title}
          </h2>
        )}
        {userType !== 2 && (
          <div style={{ textAlign: "right" }}>
            {goLiveBtnHandler(batchSelected, variantSelected) && (
              <Button
                color="primary"
                variant="contained"
                style={{
                  textTransform: "none",
                  padding: "0.4rem 2.2rem",
                  marginRight: "1.5rem",
                }}
                onClick={() => goLiveHandler()}
              >
                Go Live
              </Button>
            )}
            <Button
              color="primary"
              onClick={() =>
                variantEditEnabled
                  ? batchFormHandler(variantData, 3)
                  : (setVariantData({
                    ...variantSelected,
                    startTime: moment(variantSelected.start_time, "HH:mm:ss"),
                    endTime: moment(variantSelected.end_time, "HH:mm:ss"),
                  }),
                    setVariantEditEnabled(true))
              }
              variant="contained"
              style={{ textTransform: "none", padding: "0.4rem 2.2rem" }}
            >
              {variantEditEnabled ? "DONE" : "EDIT"}
            </Button>
          </div>
        )}
      </div>
      {!variantEditEnabled ? (
        <h3 className={styles.variantDetailsHeader}>BATCH DETAILS</h3>
      ) : (
          <br />
        )}
      <div className={styles.batchDetails}>
        <div className={styles.batchType}>
          <h4>{variantEditEnabled ? "Variant" : "Batch"} Name</h4>
        </div>
        <div
          style={{ textAlign: "right", color: "#313e6c" }}
          className={styles.batchData}
        >
          {variantEditEnabled ? (
            <TextField
              required
              name="variant_name"
              onChange={(e) =>
                setVariantData({ ...variantData, title: e.target.value })
              }
              style={{ marginTop: 15, width: "40%" }}
              value={variantData.title}
            />
          ) : (
              <h4>{batchSelected.title}</h4>
            )}
        </div>
      </div>
      <h3 className={styles.variantDetailsHeader}>
        VARIANT {variantEditEnabled ? "Price" : "DETAILS"}
      </h3>
      <div className={styles.batchDetails}>
        <div className={styles.batchType}>
          <h4>Price</h4>
          <h4>Discount Value</h4>
          <h4>Discount Type</h4>
        </div>
        <div className={styles.batchData}>
          {variantEditEnabled ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <TextField
                required
                name="price"
                onChange={(e) =>
                  setVariantData({ ...variantData, price: e.target.value })
                }
                style={{ marginTop: 15, width: "40%" }}
                value={variantData.price}
              />
              <Select
                value={variantData.discount_type}
                onChange={(e, v) => console.log(e, v)}
                style={{ marginTop: 10, width: "40%" }}
              >
                <MenuItem value={1}>Percentage</MenuItem>
                <MenuItem value={2}>Amount</MenuItem>
              </Select>
              <TextField
                required
                name="discount_value"
                onChange={(e) =>
                  setVariantData({
                    ...variantData,
                    discount_value: e.target.value,
                  })
                }
                style={{ marginTop: 10, width: "40%" }}
                value={variantData.discount_value}
              />
            </div>
          ) : (
              <div style={{ textAlign: "right", color: "#313e6c" }}>
                <h4>{variantSelected.price}</h4>
                <h4>{variantSelected.discount_value}</h4>
                <h4>
                  {variantSelected.discount_type === 1 ? "Percentage" : "Amount"}
                </h4>
              </div>
            )}
        </div>
      </div>
      <br />
      <div className={styles.batchDetails}>
        <div className={styles.batchType}>
          <h4>Max Students</h4>
        </div>
        <div
          style={{ textAlign: "right", color: "#313e6c" }}
          className={styles.batchData}
        >
          {variantEditEnabled ? (
            <TextField
              required
              name="max_students"
              onChange={(e) =>
                setVariantData({
                  ...variantData,
                  max_students: e.target.value,
                })
              }
              style={{ marginTop: 15, width: "40%" }}
              value={variantData.max_students}
            />
          ) : (
              <h4>{variantSelected.max_students}</h4>
            )}
        </div>
      </div>
      <br />
      <div className={styles.batchDetails}>
        <div className={styles.batchType}>
          <h4>Start Date</h4>
          <h4>Start Time</h4>
          <h4>End Date</h4>
          <h4>End Time</h4>
        </div>
        <div
          style={{ textAlign: "right", color: "#313e6c" }}
          className={styles.batchData}
        >
          {variantEditEnabled ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <DatePicker
                required
                value={moment(variantData.start)}
                onChange={(e) => setVariantData({ ...variantData, start: e })}
                format="DD MMMM YY"
                animateYearScrolling
                autoOk
                style={{ marginTop: 15, width: "40%" }}
              />
              <TimePicker
                required
                minutesStep={5}
                value={variantData.startTime}
                onChange={(e, v) =>
                  setVariantData({ ...variantData, startTime: e })
                }
                autoOk
                style={{ marginTop: 10, width: "40%" }}
              />
              <DatePicker
                required
                value={moment(variantData.end)}
                onChange={(e) => setVariantData({ ...variantData, end: e })}
                format="DD MMMM YY"
                animateYearScrolling
                autoOk
                style={{ marginTop: 10, width: "40%" }}
              />
              <TimePicker
                required
                minutesStep={5}
                value={variantData.endTime}
                onChange={(e, v) =>
                  setVariantData({ ...variantData, endTime: e })
                }
                autoOk
                style={{ marginTop: 10, width: "40%" }}
              />
            </div>
          ) : (
            <>
              <h4>
                {moment(variantSelected.start).format("ddd, DD MMM YYYY")}
              </h4>
              <h4>
                {moment(variantSelected.start_time, "HH:mm:ss").format(
                  "hh:mm A"
                )}
              </h4>
              <h4>{moment(variantSelected.end).format("ddd, DD MMM YYYY")}</h4>
              <h4>
                {moment(variantSelected.end_time, "HH:mm:ss").format("hh:mm A")}
              </h4>
            </>
          )}
        </div>
      </div>
      <h3 className={styles.variantDetailsHeader}>
        {variantEditEnabled ? "Select " : ""} Days
      </h3>
      <div className={styles.batchDetails}>
        <div
          style={{ marginLeft: variantEditEnabled ? "auto" : 0 }}
          className={styles.variantDays}
        >
          {[
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ].map((d) =>
            variantEditEnabled ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  margin: "-10px 0",
                }}
                key={d}
              >
                <Checkbox
                  required
                  checked={variantData[d]}
                  color="primary"
                  onChange={(e, checkedState) =>
                    setVariantData({ ...variantData, [d]: checkedState })
                  }
                />
                <span style={{ textTransform: "capitalize" }}>
                  {d.slice(0, 3)}
                </span>
              </div>
            ) : (
                <div
                  key={d}
                  style={{
                    backgroundColor: variantSelected[d]
                      ? variantSelected.colour
                      : "#ccc",
                  }}
                  className={styles.dayCircle}
                >
                  {d.slice(0, 1)}
                </div>
              )
          )}
        </div>
      </div>
      <br />
      <div className={styles.batchDetails}>
        <div className={styles.batchType}>
          <h4>Color</h4>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
          className={styles.batchData}
        >
          {variantEditEnabled ? (
            colorOptions.map((color) => {
              return (
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                    borderRadius: 3,
                    boxShadow:
                      color === variantData.colour
                        ? "0 2px 5px rgba(0, 0, 0, 0.2)"
                        : "",
                    border:
                      color === variantData.colour
                        ? "1.5px solid #999"
                        : "1.5px solid #f0f0f0",
                    backgroundColor: color,
                  }}
                  onClick={() =>
                    setVariantData({ ...variantData, colour: color })
                  }
                ></div>
              );
            })
          ) : (
              <div
                style={{ backgroundColor: variantSelected.colour }}
                className={styles.variantColor}
              ></div>
            )}
        </div>
      </div>
    </div>
  );
}
