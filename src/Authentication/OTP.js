import React, { useRef, useState } from 'react';
import styles from './Login.module.css';

function OTP() {
    const list = [...Array(6).keys()];
    const inputRef = useRef([]);
    const [inputData, setInputData] = useState({
        otp: [],
    });
    const handleKeyChange = (e, idx) => {
        const next = inputRef;
        if (idx == 6) {
            return null;
        }
        if (idx == 0 && e.key !== "Backspace" && e.key !== "Delete") {
            return null;
        }
        if (e.key == "Delete" || e.key == "Backspace") {
            if (idx == 0) {
            } else {
                next.current[idx - 1].focus();
            }
        }
    };

    const handler = (e, idx) => {
        const next = inputRef;
        const { value } = inputRef.current[idx];
        var otp_number = [...inputData.otp];
        otp_number[idx] = value;
        setInputData({ ...inputData, otp: otp_number });
        if (value.length != 0 && idx < 5 && next) {
            next.current[idx + 1].focus();
        }
    };

    return (
        <>
            <div className={styles.otpInputField}>
                {list.map((x, id) => (
                    <div key={id}>
                        <input
                            key={x}
                            ref={(el) => (inputRef.current[x] = el)}
                            onChange={(e) => handler(e, x)}
                            onKeyUp={(e) => handleKeyChange(e, x)}
                            type="text"
                            className="otp_box"
                            name={`otp_box${id}`}
                            maxLength="1"
                            style={{
                                // caretColor: "#BFA45C",
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default OTP;