import React from 'react'
import styles from './hatchTypeTemplate.css'

const HatchTypeTemplate = ({ onHanldeHatch, type, text, icon }) => {
    const bgType = () => {
        if(type === 'default') return styles.default
        if(type === 'bonus') return styles.bonus
        if(type === 'contest') return styles.contest
        if(type === 'final') return styles.final
    }
    return (
            <div className={styles.wrapperType} onClick={() => onHanldeHatch(type)}>
                <span className={`${styles.logoDefault} ${bgType()}`}>
                    {icon}
                </span>
                <span className={styles.wrapperText}>
                    <p className={styles.title} >{type}</p>
                    <p className={styles.description} >{text}</p>
                </span>
            </div>
    )
}

export default HatchTypeTemplate