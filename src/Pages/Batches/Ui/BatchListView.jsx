import React from "react";
import { EditOutlined, SearchOutlined } from "@material-ui/icons";
import {
  Button,
  CircularProgress,
  debounce,
  OutlinedInput,
} from "@material-ui/core";

import styles from "../index.module.css";

export default function BatchListView({
  loading = false,
  batchList = [],
  setBatchEditEnabled = false,
  lastItemRef = () => {},
  setBatchSelected = () => {},
  setBatchData = () => {},
  userType = 0,
  goToPath = () => {},
  getBatchList = () => {},
}) {
  return (
    <div className={styles.mainContent}>
      <div style={{ display: "flex", padding: "0 0 1% 3%" }}>
        <div style={{ width: "55%", marginRight: "15%" }}>
          {/* <SearchAutocomplete
            options={batchList}
            onChange={(e, batch) => setBatchSelected(batch)}
            styles={styles}
          /> */}
          <OutlinedInput
            fullWidth
            placeholder="Search Batch"
            className={styles.searchInput}
            onChange={debounce((e) => getBatchList(e.target.value), 500)}
            endAdornment={<SearchOutlined style={{ color: "#999" }} />}
          />
        </div>
        {userType !== 2 && (
          <div style={{ marginLeft: "5%" }}>
            <Button
              color="primary"
              onClick={() => goToPath("/batches/create")}
              variant="contained"
              style={{ textTransform: "none", padding: "0.5rem 3rem" }}
            >
              New Batch
            </Button>
          </div>
        )}
      </div>
      <div className={styles.batchContainer}>
        {batchList.map((btch, i) => (
          <div
            key={btch.id}
            ref={i + 1 < batchList.length ? null : lastItemRef}
            className={styles.batch}
          >
            <div
              style={{ cursor: "pointer", padding: "2%" }}
              onClick={() => (
                setBatchSelected(btch), goToPath("/batches/" + btch.id)
              )}
              className={styles.batchTextContainer}
            >
              <h4 className={styles.batchTitle}>{btch.title}</h4>
              <p className={styles.batchText}>
                {btch.instructors?.length > 0 &&
                  btch.instructors[0].first_name +
                    " " +
                    btch.instructors[0].last_name}{" "}
                <br />
                {btch.session?.title}
              </p>
            </div>
            {userType !== 2 && (
              <div
                onClick={() => (
                  setBatchSelected(btch),
                  setBatchData({
                    ...btch,
                    subject: btch.subject?.length > 0 ? btch.subject[0] : {},
                    instructor:
                      btch.instructors?.length > 0
                        ? {
                            id: btch.instructors[0].id,
                            title:
                              btch.instructors[0].first_name +
                              " " +
                              btch.instructors[0].last_name,
                          }
                        : {},
                  }),
                  goToPath("/batches/" + btch.id),
                  setBatchEditEnabled(true)
                )}
                className={styles.editBatch}
              >
                <EditOutlined />
              </div>
            )}
          </div>
        ))}
        {loading ? (
          <div style={{ margin: "30px auto", textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          batchList.length === 0 && (
            <div style={{ marginTop: 50, textAlign: "center" }}>
              No batches found, start by creating new batches
            </div>
          )
        )}
      </div>
    </div>
  );
}
