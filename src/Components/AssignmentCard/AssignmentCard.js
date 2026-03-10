import React from "react";
import styles from "./AssignmentCard.module.css";
import universityIcon from "../../Assets/Assignment/universityIcon.png";
import Vector from "../../Assets/Assignment/Vector.png";
import gray from "../../Assets/Assignment/gray.png"

const AssignmentCard = ({ value }) => {
  const details = (id) => {
    if (id === "1") {
      return "Number of Students Attempted: 15/60";
    } else if (id === "2") {
      return "Assigned to students";
    } else {
      return "Pending";
    }
  };


  console.log(value, "Value")

  return (
    <div>
      <div>

      <div className={styles.container}>
                <div className={styles.cardContainer}>
                  <div className={styles.imageContainer}>
                   {(value?.school?.logo) ? <img className={styles.mainImage} src={value?.school?.logo} /> : <img className={styles.mainImage} src={universityIcon} />} 
                  </div>
                  <div className={styles.infoflexCon}>
                    <div className={styles.infoContainer}>
                      <div>
                        <span className={styles.infoHeader}>
                          {value?.title}
                        </span>
                      </div>

                      {(value?.assignment) ? <div className={styles.dateContainer}>
                        <span className={styles.textColor}>
                          Total No. of Assignment : {value?.assignment?.length}
                        </span>
                        {/* <span className={styles.textColor}>
                          Date Given : {value?.assignment[0]?.assignment_availablity?.assign_date} | {" "}
                        </span>
                        <span className={styles.textColor}>
                          Submission Date : {value?.assignment[0]?.assignment_availablity?.due_date}
                        </span> */}
                      </div>: <div>No Assignment Created</div>}

                      <div>
                   {/* {  
                   info.sat == "1" &&   <p className={` ${styles.studentsAttempted}`}>
                          {abc}
                        </p> 
                        }

                       {
                         info.sat == "2" &&  <p className={` ${styles.assignedtoStudents}`}>
                           {abc}
                         </p>
                       }


                       {
                          info.sat == "3" && <p className={` ${styles.pending}`}>
                          {abc}
                        </p>
                       }  */}

                      </div>
                    </div>

                    {/* <div className={styles.iconContainer}>
                      <img src={info.icon} />
                    </div> */}
                  </div>
                </div>
              </div>

        {/* {data.map((info) => {
          let satData = info.sat;

          let abc = details(satData);

          return (
            <>
              <div className={styles.container}>
                <div className={styles.cardContainer}>
                  <div className={styles.imageContainer}>
                    <img className={styles.mainImage} src={universityIcon} />
                  </div>
                  <div className={styles.infoflexCon}>
                    <div className={styles.infoContainer}>
                      <div>
                        <span className={styles.infoHeader}>
                          {info.subject} -{" "}
                        </span>
                        <span className={styles.infoHeader}>{info.topic}</span>{" "}
                        |{" "}
                        <span className={styles.infoHeader}>
                          {" "}
                          {info.testno}
                        </span>
                      </div>

                      <div className={styles.dateContainer}>
                        <span className={styles.textColor}>
                          Date Given : {info.dateGiven} | {" "}
                        </span>
                        <span className={styles.textColor}>
                          Submission Date : {info.submissionDate}
                        </span>
                      </div>

                      <div>
                   {  
                   info.sat == "1" &&   <p className={` ${styles.studentsAttempted}`}>
                          {abc}
                        </p> 
                        }

                       {
                         info.sat == "2" &&  <p className={` ${styles.assignedtoStudents}`}>
                           {abc}
                         </p>
                       }


                       {
                          info.sat == "3" && <p className={` ${styles.pending}`}>
                          {abc}
                        </p>
                       } 

                      </div>
                    </div>

                    <div className={styles.iconContainer}>
                      <img src={info.icon} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })} */}
      </div>
    </div>
  );
};

export default AssignmentCard;


const data = [
  {
    subject: "Physics",
    topic: "Matter",
    testno: "Test 01",
    dateGiven: " 8th Dec 22",
    submissionDate: "10th Dec 22",
    sa: "Number of Students Attempted: 15/60",
    sat: "1",
    icon : Vector
  },
  {
    subject: "Physics",
    topic: "Matter",
    testno: "Test 02",
    dateGiven: " 8th Dec 22",
    submissionDate: "10th Dec 22",
    sa: "Assigned to students",
    sat: "2",
    icon : gray
  },
  {
    subject: "Physics",
    topic: "Matter",
    testno: "Test 02",
    dateGiven: " 8th Dec 22",
    submissionDate: "10th Dec 22",
    sa: "Pending",
    sat: "3",
    icon: gray
  },
];
