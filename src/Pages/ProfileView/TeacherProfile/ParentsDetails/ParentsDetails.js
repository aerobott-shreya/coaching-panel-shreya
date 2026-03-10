import React from 'react'
import styles from "./index.module.css";
import parents from "../../../../Assets/Profile/parents.png";
import mother from "../../../../Assets/Profile/mother.png";
import phone from "../../../../Assets/Profile/phone.png";

const ParentsDetails = ({ userState }) => {
  let parent2;
  let parent1;

  if (userState?.student_guardian?.[0].relationship.id === 1) {
    parent1 = userState?.student_guardian?.[0];
  } else if (userState?.student_guardian?.[1].relationship.id === 1) {
    parent1 = userState?.student_guardian?.[1];

  }

  if (userState?.student_guardian?.[0].relationship.id === 2) {
    parent2 = userState?.student_guardian?.[0];
  } else if (userState?.student_guardian?.[1].relationship.id === 2) {
    parent2 = userState?.student_guardian?.[1];
  }


  return (
    <div>
      <div className={styles.mainContainer}>


        <div className={styles.rightInfocon}>
          <div className={styles.imageCon}>
            <img className={styles.mainImage} src={parents} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Father Name</p>
            <p className={styles.desc} >{parent1?.user?.first_name}{" "} {parent1?.user?.last_name}</p>
          </div>
        </div>


        <div className={styles.rightInfocon}>
          <div className={styles.imageCon}>
            <img className={styles.mainImage} src={parents} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Occupation</p>
            <p className={styles.desc} >{parent1?.occupation}</p>
          </div>
        </div>



        <div className={styles.rightInfocon}>
          <div className={styles.imageCon}>
            <img className={styles.mainImage} src={mother} />
          </div>

          <div className={styles.InfoCon}>
            <p className={styles.title}>Mother Name</p>
            <p className={styles.desc} >{parent2?.user?.first_name}{" "} {parent2?.user?.last_name}</p>
          </div>
        </div>


        <div className={styles.rightInfocon}>
          <div className={styles.imageCon}>
            <img className={styles.mainImage} src={parents} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Occupation</p>
            <p className={styles.desc} >{parent2?.occupation}</p>
          </div>
        </div>


        <div className={styles.rightInfocon}>
          <div className={styles.imageCon}>
            <img className={styles.mainImage} src={phone} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Father’s Contact No</p>
            <p className={styles.desc} >{parent2?.user?.phone}</p>
          </div>
        </div>

        <div className={styles.rightInfocon}>
          <div className={styles.imageCon}>
            <img className={styles.mainImage} src={phone} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Mother’s Contact No</p>
            <p className={styles.desc} >{parent1?.user?.phone}</p>
          </div>
        </div>



      </div>



    </div>
  )
}

export default ParentsDetails