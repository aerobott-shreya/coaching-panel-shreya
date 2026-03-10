import React from 'react'
import styles from "./index.module.css"
import Mail from "../../../../Assets/Contact/email.png";
import Address from "../../../../Assets/Contact/address.png";
import Phone from "../../../../Assets/Contact/phone.png";



const ContactDetails = ({userState}) => {
  return (
    <div>
  <div className={styles.mainContainer}>
        <div className={styles.teacherMain}>
            <div>
                <img src={Mail} alt="images" className={styles.image} />
            </div>
            <div>
                <div><p className={styles.title}>Mail ID</p></div>
                <div>{userState?.user?.email || "----"}</div>
            </div>
        </div>

        <div className={styles.teacherMain}>
            <div>
                <img src={Phone} alt="images" className={styles.image} />
            </div>
            <div>
                <div><p className={styles.title}>Phone No</p></div>
                <div>{userState?.user?.phone || "----"}</div>
            </div>
        </div>

        {(userState.address.length < 0)? <div className={styles.teacherMain}>
            <div>
                <img src={Address} alt="images" className={styles.image} />
            </div>
            <div>
                <div><p className={styles.title}>Address</p></div>
                <div>No Address</div>
            </div>
        </div>

        : 
        <>
        {userState.address.map((v,i) => (<div className={styles.teacherMain}>
            <div>
                <img src={Address} alt="images" className={styles.image} />
            </div>
            <div>
                <div><p className={styles.title}>Address {i+1}</p></div>
                <div>
                    <div style={{fontSize: '15px'}}>{`${v?.line_1} ${v?.line_2} `}</div>
                    <div style={{fontSize: '15px'}}>{`${v?.landmark} `}</div>
                    <div style={{fontSize: '15px'}}>{`${v?.city}, ${v?.state}, ${v?.pincode} `}</div>
                    <div style={{fontSize: '15px'}}>{`${v?.country} `}</div>

                </div>
            </div>
        </div>))}
        </>
        
        }
    </div>  
    </div>
  )
}

export default ContactDetails