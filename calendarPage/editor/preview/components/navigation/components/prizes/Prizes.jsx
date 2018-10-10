import React, { Component } from 'react'
import { connect } from 'react-redux'
import Prize from './components/prize/Prize'
import { createPrize, deletePrize, updatePrize, getPrizes } from 'data/calendar/navigation/prizes/actions'
import styles from './prizes.css'
import {bindActionCreators} from 'redux';

const mapStateToProps = state => {
    return {
        prizes: state.prizes,
        calendarID: state.calendar.id
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            getPrizes,
            createPrize,
            deletePrize,
            updatePrize
        }, dispatch
    )
})


@connect( mapStateToProps, mapDispatchToProps )
export default class Prizes extends Component {

    /*componentDidMount() {
        const { calendarPrizes, actions: { getPrizes } } = this.props
        getPrizes(calendarPrizes)
    }*/

    render() {

        const { prizes, calendarID, actions } = this.props
        console.log(this.props, 'PROPSASAS')
        return (
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Prizes</h3>
                { prizes && Object.keys(prizes).map( prizeID => <Prize actions={actions} key={prizes[prizeID].id} prize={ prizes[prizeID] } /> ) }
                <button className={styles.buttonAdd} onClick={ () => actions.createPrize(calendarID) }>+ Add Prize</button>
            </div>
        )
    }
}
