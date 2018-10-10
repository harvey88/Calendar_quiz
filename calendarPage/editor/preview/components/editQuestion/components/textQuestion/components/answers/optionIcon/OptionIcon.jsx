import React from 'react'

import { integerToLetter } from 'utils/transformations'
import BulletIcon from 'assets/svg/bullet.svg'
import styles from './optionIcon.css'

const OptionIcon = ({bulletType, numberType, letterType, keyNumber, actionOnClick, elementStyle}) => {
    return (
        <div onClick={actionOnClick} >
            <div style={elementStyle} className={styles.squarePoint} >
                <span className={styles.listTypeText} >
                {bulletType && <BulletIcon className={styles.bulletIcon} />}
                {numberType && keyNumber + 1}
                {letterType && integerToLetter(keyNumber).toUpperCase()}
                </span>
            </div>
        </div>
    )
}

export default OptionIcon