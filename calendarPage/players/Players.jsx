import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterPlayers from './filterPlayers/FilterPlayers'
import { getCalendarPlayers } from 'data/calendar/players/actions'

import styles from './players.css'

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getCalendarPlayers,
    }, dispatch)
})
const mapStateToProps = ({ calendarPlayers }) => ({ calendarPlayers })


@connect(mapStateToProps, mapDispatchToProps)
export default class Players extends Component {
    componentDidMount() {
        const { actions: { getCalendarPlayers }, match: {params: {calendarID}}, players } = this.props
        getCalendarPlayers(calendarID)
    }

    render() {
        const { calendarPlayers } = this.props

        return (
            <div>
                <FilterPlayers/>
                <div className={styles.playersTable} >
                    <div className={styles.headerTable}>
                        <div>#</div>
                        <div>Name</div>
                        <div>E-mail</div>
                        <div className={styles.textCenter} >Points</div>
                        <div className={styles.textCenter} >Hatches Played</div>
                    </div>
                        {calendarPlayers && Object.values(calendarPlayers).map((el, index) => {
                            return (
                                <div key={index} className={styles.bodyTable}>
                                    <div>{ index + 1 }</div>
                                    <div>{el.name}</div>
                                    <div>{el.email}</div>
                                    <div className={styles.textCenter} >{el.points}</div>
                                    <div className={styles.textCenter} >{el.hatches_played}</div>
                                </div>
                            )
                        })}
                </div>
                
            </div>
        );
    }
}