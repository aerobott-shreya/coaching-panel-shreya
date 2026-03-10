import React from "react";
import AllStudentReports from "../AllStudentReports/AllStudentReports";
import styles from "./index.module.css";
import ReportPieChart from "../../Components/ReportPieChart/ReportPieChart";
import ReportParameterbox from "../../Components/ReportParameterbox/ReportParameterbox";
import up from "../../Assets/thumbsUp.png";
import down from "../../Assets/thumbsdown.png";

function ClassSectionsReports() {
  return (
    <div>
      <h2 className={styles.sectionHeading}>Dream Career</h2>
      <ReportPieChart />
      <h2 className={styles.sectionHeading}>
        Overall analysis of Aptitude Test
      </h2>
      <div className={styles.testInnerContainer}>
        <ReportParameterbox
          text={"Top 10 Area Of Strength"}
          // list={dreamCareer?.area_of_strength_aptitude}
          img={up}
          background={"linear-gradient(360deg, #5ED56A 0%, #0B7754 100%)"}
        />
        <ReportParameterbox
          text={"Top 10 Areas for improvement"}
          // list={dreamCareer?.area_of_strength_aptitude}
          img={down}
          background={"linear-gradient(180deg, #FF6020 0%, #EC914D 100%)"}
        />
      </div>
      <h2 className={styles.sectionHeading}>
        Overall analysis of Interest Test
      </h2>
      <div className={styles.testInnerContainer}>
        <ReportParameterbox
          text={"Top 10 Area Of Interest"}
          // list={dreamCareer?.area_of_strength_aptitude}
          img={up}
          background={"linear-gradient(360deg, #57C3FF 0%, #514EFF 100%)"}
        />
        <ReportParameterbox
          text={"Top 10 Areas of less Interest"}
          // list={dreamCareer?.area_of_strength_aptitude}
          img={down}
          background={"linear-gradient(0deg, #FF6969 0%, #B30000 100%)"}
        />
      </div>
      <h2 className={styles.sectionHeading}>All Students</h2>
      <AllStudentReports />
    </div>
  );
}

export default ClassSectionsReports;
