import React from "react";
import styles from "./index.module.css";
import bbdImg from "../../Assets/BBdased.png";

function ReportParameterbox({
  text = "",
  // list=[],
  img = "",
  background = "",
}) {
  return (
    <div className={styles.boxContainer} style={{ background: background }}>
      <div className={styles.textimageTop}>
        <img src={img} />
        {text}
      </div>
      <img src={bbdImg} />

      <ul className={styles.listContainer}>
        {result?.map((v, i) => {
          console.log(result, "listContainer");

          return (
            <li className={styles.listText}>
              <span>{v?.title}</span>
              <span>{v?.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReportParameterbox;

const result = [
  {
    title: "Technological",
    value: 30,
  },
];
