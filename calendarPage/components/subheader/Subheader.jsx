import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from './subheader.css'
import SlideIcon from 'assets/svg/slide.svg'
import PlayersIcon from 'assets/svg/people.svg'
import StatisticsIcon from 'assets/svg/chart.svg'
import SettingsIcon from 'assets/svg/settings.svg'


const mapStateToProps = ({ calendar }) => ({ calendar })

const CalendarModesToggler = ({ calendar }) => {
    const isCalendarAvailable = !! calendar.id
    if(!isCalendarAvailable){
        return <div>Fetching calendar...</div>
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.modeController}>
                <NavLink
                    to={`/calendar/${calendar.id}/editor`}
                    className={styles.navLink}
                    activeClassName={styles.activeNav}>
                    <SlideIcon
                        className={styles.iconNav}
                    />
                    Editor
                </NavLink>
                <NavLink
                    to={`/calendar/${calendar.id}/players`}
                    className={styles.navLink}
                    activeClassName={styles.activeNav}>
                    <PlayersIcon
                        className={styles.iconNav} />
                    Players</NavLink>
                <NavLink
                    to={`/calendar/${calendar.id}/statistics`}
                    className={styles.navLink}
                    activeClassName={styles.activeNav}>
                    <StatisticsIcon
                        className={styles.iconNav}
                    />
                    Statistics
                </NavLink>
                <NavLink
                    to={`/calendar/${calendar.id}/settings`} className={styles.navLink} activeClassName={styles.activeNav}>
                    <SettingsIcon className={styles.iconNav} /> Settings</NavLink>
            </div>
            <span/>
        </div>
    )
}


export default connect(mapStateToProps, null, null, { pure: false})(CalendarModesToggler)
