import React from "react";
import { Button } from "@material-ui/core";
import moment from "moment";

import LIVE from "../../../Asset/IMAGE/LIVE.png";
import goLiveBtnHandler from "../../../Utils/CommonFunctions";

export default function LiveCourseListView({
  liveCourseList = [],
  styles = {},
  setBatchSelected = () => {},
  setVariantSelected = () => {},
  getBatchData = () => {},
  goLiveHandler = () => {},
  goToPath = () => {},
}) {
  return (
    <div className={styles.mainLiveContainer}>
      <h3 style={{ color: "#313e6c" }}>Live Today</h3>
      {liveCourseList.map((course) => (
        <div key={course.id} className={styles.liveCourse}>
          <div
            onClick={() => (
              setVariantSelected(course.validity_info),
              setBatchSelected(course.batch_info),
              goToPath(
                `/batches/${course.batch_info?.id}/${course.validity_info?.id}`
              ),
              getBatchData(course.batch)
            )}
            style={{ display: "flex", alignItems: "start", cursor: "pointer" }}
          >
            <img src={LIVE} alt="live" className={styles.liveImg} />
            <div>
              <h3
                style={{
                  margin: "4px 0",
                  textTransform: "capitalize",
                  color: "#313e6c",
                }}
              >
                {course.validity_info?.title}
              </h3>
              <span>{course.title}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 15,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              onClick={() => (
                setVariantSelected(course.validity_info),
                setBatchSelected(course.batch_info),
                goToPath(
                  `/batches/${course.batch_info?.id}/${course.validity_info?.id}`
                ),
                getBatchData(course.batch)
              )}
              style={{ cursor: "pointer" }}
            >
              {moment(course.commence, "HH:mm:ss").format("hh:mmA") +
                " - " +
                moment(course.conclude, "HH:mm:ss").format("hh:mmA")}
            </span>
            <Button
              color="primary"
              disabled={
                !goLiveBtnHandler(course.batch_info, course.validity_info)
              }
              className={styles.liveBtn}
              variant="contained"
              onClick={() => goLiveHandler(course.batch_info.id)}
            >
              Go Live
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
