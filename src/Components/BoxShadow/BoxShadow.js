import React from 'react';
import styles from './BoxShadow.module.css';

function BoxShadow({ header, ...props }) {
    return (
        <div className={styles.boxShadow}>
            <div className={styles.header}>{header}</div>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );
}

export default BoxShadow;