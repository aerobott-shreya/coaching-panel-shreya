import React, { useEffect, useState } from 'react'
import styles from "./index.module.css";
import parents from "../../../../Assets/Profile/parents.png";
import mother from "../../../../Assets/Profile/mother.png";
import phone from "../../../../Assets/Profile/phone.png";

const ParentsDetails = ({ userState, getData = () => {} }) => {
  const [parent1, setParent1] =  useState({});
  const [parent2, setParent2] =  useState({});


  // if(userState?.student_guardian ==  "No registered guardian"){

  // }
  function userDetails(){

    if(userState.student_guardian.length.length< 1   ){
        return
    }
      setParent1(userState?.student_guardian[0]);

    // if (userState?.student_guardian[0]?.relationship === 1){
    //   setParent1(userState?.student_guardian[0]);
    // } else if (userState?.student_guardian[1]?.relationship === 1){
    //   setParent1(userState?.student_guardian[1]);
    // }
  
    // if (userState?.student_guardian[0]?.relationship === 2){
    //   setParent2(userState?.student_guardian[0]);
    // } else if(userState?.student_guardian[1]?.relationship === 2){
    //   setParent2(userState?.student_guardian[1]);
    // }
  }

  useEffect(() =>{
    // getData();
    userDetails();

  },[userState])


  return (
    <div>
      <div className={styles.mainContainer}>

     

  
        <div className={styles.rightInfocon}>
          <div  className={styles.imageCon}>
            <img styles= {{width: "11px", height:"31px"}}src={parents} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Father Name</p>
            <p className={styles.desc} >{parent1?.first_name}{" "} {parent1?.last_name}</p>
          </div>
        </div>


        <div className={styles.rightInfocon}>
          <div  className={styles.imageCon}>
            <img styles= {{width: "11px", height:"31px"}} src={parents} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Occupation</p>
            <p className={styles.desc} >{parent1?.occupation}</p>
          </div>
        </div>



        {/* <div className={styles.rightInfocon}>
          <div className={styles.imageCon}>
            <img styles= {{width: "7px", height:"31px"}} src={mother} />
          </div>

          <div className={styles.InfoCon}>
            <p className={styles.title}>Mother Name</p>
            <p className={styles.desc} >{parent2?.user?.first_name}{" "} {parent2?.user?.last_name}</p>
          </div>
        </div>


        <div className={styles.rightInfocon}>
          <div className={styles.imageCon}>
            <img styles= {{width: "11px", height:"31px"}} src={parents} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Occupation</p>
            <p className={styles.desc} >{parent2?.occupation}</p>
          </div>
        </div> */}


        <div className={styles.rightInfocon}>
          <div className={`${styles.mainImgCon}`}>
            <img style={{width:"15px",height: "20px" }}  src={phone} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Father’s Contact No</p>
            <p className={styles.desc} >{parent1?.phone}</p>
          </div>
        </div>

        {/* <div className={styles.rightInfocon}>
          <div className={`${styles.mainImgCon}`}>
            <img style={{width:"15px",height: "20px" }} src={phone} />
          </div>
          <div className={styles.InfoCon}>
            <p className={styles.title}>Mother’s Contact No</p>
            <p className={styles.desc} >{parent2?.user?.phone}</p>
          </div>
        </div> */}



      </div>



    </div>
  )
}

export default ParentsDetails