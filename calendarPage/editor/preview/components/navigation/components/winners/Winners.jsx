import React, { Component } from 'react'
import { TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styles from './winners.css'
import {bindActionCreators} from 'redux'
import {updateCalendarWinners} from 'data/calendar/navigation/winners/actions'
import TextFormatPopup from '../textFormatPopup/TextFormatPopup'
import FormatText from 'assets/svg/format-text.svg'

const mapStateToProps = state => {
    return {
        winners: state.calendar.winners,
        calendarID: state.calendar.id
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        { updateCalendarWinners }, dispatch
    )
})


@connect( mapStateToProps, mapDispatchToProps )
export default class Rules extends Component {
    state = {
        text: '',
        font_style: {
            color: 'rgba(255,255,255,1)',
            textAlign: 'center',
            fontSize: '1.6rem',
            fontStyle: 'normal'
        },
        popOverOpened: false
    }

    componentDidMount() {
        const { winners } = this.props

        if(this.props.winners) {
            this.setState({
                text: winners.text,
                font_style: winners.font_style ? JSON.parse(winners.font_style) : this.state.font_style
            })
        }
    }

    applyUpdates = (winnersPart) => {
        const { actions: { updateCalendarWinners }, calendarID } = this.props
        const stringifiedPart = winnersPart === 'font_style'
            ? JSON.stringify(this.state[winnersPart])
            : this.state[winnersPart]

        updateCalendarWinners( calendarID, { [winnersPart]: stringifiedPart } )
    }
    closePopOver = () => this.setState({popOverOpened: false}, this.applyUpdates('font_style'))
    openPopOver = () => this.setState({popOverOpened: true})

    changeStyles = (property, value) => {

        const {font_style} = this.state
        this.setState({
            font_style: { ...font_style, [property]: value }
        })
    }

    render() {
        const { text, font_style, popOverOpened } = this.state
        return (
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Winners</h3>
                <FormatText className={styles.formatText} onClick={this.openPopOver}/>
                <TextArea
                    placeholder={'Insert Winners Text Here'}
                    autoHeight
                    className={styles.winnersText}
                    style={font_style}
                    value={ text }
                    rows={2}
                    onChange={e => this.setState({text: e.target.value})}
                    onBlur={() => this.applyUpdates('text')}
                />
                { popOverOpened && <TextFormatPopup fontStyle={font_style} changeStyles={this.changeStyles} closePopOver={this.closePopOver}  /> }
            </div>
        )
    }
}
