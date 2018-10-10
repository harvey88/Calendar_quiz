import React, {Component} from 'react'
import InputRange from 'react-input-range'
import '!style-loader!css-loader!react-input-range/lib/css/index.css'
import CustomRadio from 'common/customRadio/CustomRadio'
import styles from './answers.css'

export default class Answers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startValue: 1,
            endValue: 2,
            stepInterval: 1,
            value: 1,
            answerSelected: false,
            answerType: 'point',
            correctAnswer: 1
        }
        this.startValue = null
        this.endValue = null
        this.stepInterval = null

        this.numberExpr = /^\d+$/
        // this.yearExpr = /^[1-9][0-9]{3}$/
    }

    componentDidMount() {
        const {answers} = this.props
        if (!answers) {
            this.createAnswer()
        }
        this.synchronizeState(this.props)
    }

    createAnswer = () => {
        const {actions: {createAnswer}, currentQuestion, currentQuestion: {type, localization: {id}}} = this.props
        createAnswer(currentQuestion.id, {
            start_value: 0,
            end_value: 10,
            step_interval: 1,
            value: 'units',
            correct_answer: 5,
            answer_type: 'point'
        }, id, type)
    }
    synchronizeState = props => {
        if (props.answers) {
            if (props.answers.correct_answer) {
                this.setState({
                    startValue: props.answers.start_value,
                    endValue: props.answers.end_value,
                    stepInterval: props.answers.step_interval,
                    value: props.answers.value,
                    answerType: props.answers.answer_type,
                    answerSelected: props.answers.correct_answer ? true : false,
                    correctAnswer: props.answers.correct_answer,
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.props.currentQuestion.id !== prevProps.currentQuestion.id)) {
            if (!prevProps.answers) {
                this.createAnswer()
            }
            this.synchronizeState(this.props)
        } else if (!prevProps.answers) {
            this.synchronizeState(this.props)
        }
    }

    componentWillReceiveProps(newProps) {
        this.componentDidUpdate(newProps)
    }

    handleChange = (e, {value}) => {
        const {actions: {updateAnswer}, currentQuestion: {type, localization: {id}}, answers} = this.props
        let newValue = 5
        let startValue = 1
        let endValue = 10
        if (value === 'range') {
            newValue = {min: 1, max: 10}
        }

        this.setState({
            correctAnswer: newValue,
            answerType: value,
            answerSelected: false,
            startValue: startValue,
            endValue: endValue
        }, () => {
            updateAnswer(id, answers.id, {answer_type: this.state.answerType}, type)
        })
    }
    startValueChange = e => {
        const {actions: {updateAnswer}, currentQuestion: {type, localization: {id}}, answers} = this.props

        if (this.numberExpr.test(e.target.value)) {

            if (e.target.value > this.state.endValue) {
                this.startValue.innerHTML = 'Error value'
                this.startValue.style.color = '#850007'
                e.target.style.borderBottomColor = '#850007'
                this.setState({startValue: e.target.value}, () => {} )
                e.target.value = 0

            } else {
                this.startValue.innerHTML = 'Start value'
                this.startValue.style.color = '#9b9b9b'
                e.target.style.borderBottomColor = '#fff'
                    this.setState({startValue: e.target.value}, () => {})
                    updateAnswer(id, answers.id, {start_value: e.target.value}, type)
            }

        } else {
            e.target.value = 0
        }
    }
    endValueChange = e => {
        const {actions: {updateAnswer}, currentQuestion: {type, localization: {id}}, answers} = this.props

        if (this.numberExpr.test(e.target.value)) {
            if (e.target.value < this.state.startValue) {
                this.endValue.innerHTML = 'Error value'
                this.endValue.style.color = '#850007'
                e.target.style.borderBottomColor = '#850007'

                this.setState({endValue: e.target.value}, () => {})
                e.target.value = 0
            } else {
                this.endValue.innerHTML = 'End value'
                this.endValue.style.color = '#9b9b9b'
                e.target.style.borderBottomColor = '#fff'
                this.setState({endValue: e.target.value}, () => {})
                updateAnswer(id, answers.id, {end_value: e.target.value}, type)
            }
        } else {
            e.target.value = 0
        }
    }
    intervalChange = e => {
        const {actions: {updateAnswer}, currentQuestion: {type, localization: {id}}, answers} = this.props
        if (this.numberExpr.test(e.target.value)) {

            let range = this.state.endValue - this.state.startValue
            if (range % e.target.value) {
                this.setState({stepInterval: e.target.value}, () => {})
                e.target.value = 0
                this.stepInterval.innerHTML = 'Error interval'
                this.stepInterval.style.color = '#850007'
                e.target.style.borderBottomColor = '#850007'
            } else {

                this.stepInterval.innerHTML = 'Step interval'
                this.stepInterval.style.color = '#9b9b9b'
                e.target.style.borderBottomColor = '#fff'
                this.setState({stepInterval: e.target.value}, () => {})
                updateAnswer(id, answers.id, {step_interval: e.target.value}, type)
            }

        } else {
            e.target.value = 0
        }
    }
    valueUnitChange = e => {
        const {actions: {updateAnswer}, currentQuestion: {type, localization: {id}}, answers} = this.props
        this.setState({value: e.target.value}, () => {

        })
        updateAnswer(id, answers.id, {value: e.target.value}, type)
    }
    selectAnswer = () => {
        const {actions: {updateAnswer}, currentQuestion: {type, localization: {id}}, answers} = this.props
        this.setState({answerSelected: true}, () => {

        })
        updateAnswer(id, answers.id, {correct_answer: this.state.correctAnswer}, type)
    }

    render() {
        if (!this.props.answers) {
            return null
        }
        const {startValue, endValue, stepInterval, value, answerSelected, answerType, correctAnswer} = this.state
        const labelVisibilityCondition = typeof(value) !== 'object' || value === null ? ((value === startValue) || (value === startValue)) : ((value.max === endValue) || (value.min === startValue))

        return (
            <div className={styles.wrapper}>
                <div className={styles.values}>
                    {startValue !== null &&
                    <div className={styles.item}>
                        <p ref={(p) => {
                            this.startValue = p
                        }}>Start value</p>
                        <input className={styles.itemInput} value={startValue}
                            onBlur={this.startValueChange}
                            onChange={(e)=>{this.setState({startValue: e.target.value}, () => {})}}
                        />
                    </div>}
                    {endValue !== null &&
                    <div className={styles.item}>
                        <p ref={(p) => {
                            this.endValue = p
                        }}>End value</p>
                        <input className={styles.itemInput} value={endValue}
                            onBlur={this.endValueChange}
                            onChange={(e)=>{this.setState({endValue: e.target.value}, () => {})}}
                        />
                    </div>}
                    {stepInterval !== null && <div className={styles.item}>
                        <p ref={(p) => {
                            this.stepInterval = p
                        }}>Step interval</p>
                        <input className={styles.itemInput} value={stepInterval}
                            onChange={(e)=>{this.setState({stepInterval: e.target.value}, () => {})} }
                            onBlur={this.intervalChange}
                        />
                    </div>
                    }
                    {value !== null && <div className={styles.item}>
                        <p>Value</p>
                        <input className={styles.itemInput} value={value} onChange={this.valueUnitChange}/>
                    </div>}
                </div>
                <div
                    className={`${styles.inputRange} ${labelVisibilityCondition ? styles.inputRangeActive : ''} ${answerSelected ? styles.inputRangeSelected : ''}`}>

                    {(() => {
                        if (answerType === 'point' || typeof correctAnswer === 'number' || typeof correctAnswer === 'object') {

                            return (
                                <div>
                                    <InputRange
                                        step={Number(stepInterval)}
                                        maxValue={Number(endValue)}
                                        minValue={Number(startValue)}
                                        value={correctAnswer}
                                        onChange={value => this.setState({
                                            correctAnswer: value,
                                            answerSelected: false
                                        })}/>
                                </div>

                            )
                        }
                    })()}

                    <div className={styles.answerSelect} onClick={this.selectAnswer}>Select answer</div>
                </div>
                <div className={styles.options}>
                    <CustomRadio
                        label='Point'
                        name='radioGroup'
                        value={'point'}
                        checked={answerType === 'point'}
                        onChange={this.handleChange}
                        className={styles.radio}
                    />
                    <CustomRadio
                        label='Range'
                        name='radioGroup'
                        value={'range'}
                        checked={answerType === 'range'}
                        onChange={this.handleChange}
                        className={styles.radio}
                    />
                </div>
            </div>
        )
    }
}