import React, { Component } from 'react'
import { TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styles from './rules.css'
import {bindActionCreators} from 'redux'
import { updateCalendarRules } from 'data/calendar/navigation/rules/actions'
import TextFormatPopup from '../textFormatPopup/TextFormatPopup'
import FormatText from 'assets/svg/format-text.svg'

const mapStateToProps = state => {
    return {
        rules: state.calendar.rules,
        calendarID: state.calendar.id
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        { updateCalendarRules }, dispatch
    )
})


@connect( mapStateToProps, mapDispatchToProps )
export default class Rules extends Component {
    state = {
        text: '',
        font_style: {
            color: 'rgba(255,255,255,1)',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.6rem',
            fontStyle: 'normal'
        },
        popOverOpened: false
    }

    componentDidMount() {
        const { rules } = this.props

        if(this.props.rules) {
            this.setState({
                text: rules.text,
                font_style: JSON.parse(rules.font_style)
            })
        }
    }

    applyUpdates = (rulesPart) => {
        const { actions: { updateCalendarRules }, calendarID } = this.props
        const stringifiedPart = rulesPart === 'font_style'
            ? JSON.stringify(this.state[rulesPart])
            : this.state[rulesPart]

        updateCalendarRules( calendarID, { [rulesPart]: stringifiedPart } )
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
                <h3 className={styles.title}>Rules</h3>
                <FormatText className={styles.formatText} onClick={this.openPopOver}/>
                <TextArea
                    placeholder={'Insert Rules Text Here'}
                    autoHeight
                    className={styles.rulesText}
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
