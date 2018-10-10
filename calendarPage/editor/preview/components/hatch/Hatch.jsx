import React, { Component } from 'react'
import styles from './hatch.css'

export default class Hatch extends Component {   

    render() {
        const { hatch, handleHatchTemplate } = this.props
        const { hatch: { background }, index } = this.props
        const displayHatch = () => {
            if(hatch.type === 'default') return styles.default
            if(hatch.type === 'bonus') return styles.bonus
            if(hatch.type === 'contest') return styles.contest
            if(hatch.type === 'final') return styles.final
        }
        return (
            <div 
                style={background ? {background: background}: {}}
                className={`${styles.hatchWrapper} ${displayHatch()}`} 
                onClick={() => handleHatchTemplate(hatch)}><span className={styles.hatchIndex}>{ index }</span>
                {hatch.type}
            </div>
        )
    }
}