import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCalendarPlayers } from 'data/calendar/players/actions'

import styles from './leaderboard.css'

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getCalendarPlayers,
    }, dispatch)
})
const mapStateToProps = state => {
    return {
        calendarPlayers: state.calendarPlayers,
        calendarID: state.calendar.id
    }
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Leaderboard extends Component {
    componentDidMount() {
        const { actions: { getCalendarPlayers }, calendarID} = this.props
        getCalendarPlayers(calendarID)
    }

    render() {
        const { calendarPlayers } = this.props

        return (
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Leaderboard</h3>
                <div className={styles.playersTable} >
                    <div className={styles.headerTable}>
                        <div>#</div>
                        <div>Name</div>
                        <div className={styles.textCenter} >Points</div>
                    </div>
                    {calendarPlayers && Object.values(calendarPlayers).map((el, index) => {
                        return (
                            <div key={index} className={styles.bodyTable}>
                                <div>{ index + 1 }</div>
                                <div>{el.name}</div>
                                <div className={styles.textCenter} >{el.points}</div>
                            </div>
                        )
                    })}
                </div>

            </div>
        );
    }
}