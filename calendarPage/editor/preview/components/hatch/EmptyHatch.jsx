import React, { Component } from 'react'
import styles from './hatch.css'
import Plus from 'assets/svg/plus.svg'

export default class EmptyHatch extends Component {

    render() {
        const { first, handleCreateHatchTemplate } = this.props
        return (
            <div onClick={handleCreateHatchTemplate}  className={styles.hatchWrapper}>
                { first && <div className={styles.firstEmpty}><Plus/></div> }
            </div>
        )
    }
}