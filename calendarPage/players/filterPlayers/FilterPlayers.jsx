import React, { Component } from 'react'
import CalendarIcon from '../../../../../../assets/svg/Calendar.svg'
import ExcelIcon from '../../../../../../assets/svg/excel.svg'
import styles from './filterPlayers.css'

class FilterPlayers extends Component {
    render() {
        return (
            <div className={styles.wrapper} >
                <div className={styles.filterButton} >
                    <CalendarIcon className={styles.icon}/>
                    <span>Last 3 months</span> 
                </div>
                <div className={styles.report}>
                    <div className={styles.filterButton} >
                        <ExcelIcon className={styles.icon} />
                        <span>Export</span>
                    </div>
                    <div className={styles.data} >
                        Set up email report
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterPlayers;