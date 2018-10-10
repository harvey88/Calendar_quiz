import React, { Component } from 'react'
import styles from './navigation.css'

export default class Navigation extends Component {

    state = {
        prizes: false,
        leaderboard: false,
        winners: false,
        rules: false,
    }
    componentDidMount(){
        if(this.props.settings) {
            this.syncState(this.props)
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.settings) {
            this.syncState(newProps)
        }

    }

    syncState = props => {
        const { settings: { prizes, leaderboard, winners, rules } } = props
        this.setState({ prizes, leaderboard, winners, rules })
    }

    render() {
        const { setNavigationView } = this.props
        const { prizes, leaderboard, winners, rules } = this.state
        return (
            <div className={styles.navWrapper}>
                { (prizes || leaderboard || winners || rules) && <div className={styles.navItem} onClick={ ()=> setNavigationView(null) }>Start</div> }
                { prizes && <div className={styles.navItem} onClick={ ()=> setNavigationView('prizes') }>Prizes</div> }
                { leaderboard && <div className={styles.navItem} onClick={ ()=> setNavigationView('leaderboard') }>Leaderboard</div> }
                { winners && <div className={styles.navItem} onClick={ ()=> setNavigationView('winners') }>Winners</div> }
                { rules && <div className={styles.navItem} onClick={ ()=> setNavigationView('rules') }>Rules</div> }
            </div>
        )
    }
}