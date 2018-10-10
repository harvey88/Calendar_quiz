import React, { Component } from 'react'
import styles from './answer.css'

import CustomRadio from 'common/customRadio/CustomRadio'
import PopOver from 'common/popOver/PopOver'
import OptionIcon from '../optionIcon/OptionIcon'
import DeleteIcon from 'assets/svg/trash.svg'
import BulletIcon from 'assets/svg/bullet.svg'

import { BULLET_LIST_TYPE, NUMBER_LIST_TYPE, LETTER_LIST_TYPE } from '../constants'

class Answer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popOverOpened: false,
            isAnswerCorrect: props.answer.is_correct
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.isAnswerCorrect !== props.answer.is_correct) {
            return {
                isAnswerCorrect: props.answer.is_correct
            }
        }
        return null
    }

    updateAnswer = e => {
        const {
            actions: { updateAnswer },
            currentQuestion: { type, localization: { id } },
            answer
        } = this.props
        const text = e.target.value
        if (text) {
            updateAnswer(id, answer.id, { text }, type)
        }
    }

    deleteAnswer = () => {
        const {
            actions: { deleteAnswer },
            currentQuestion: { type, localization: { id } },
            answer
        } = this.props
        deleteAnswer(id, answer.id, type)
    }

    openPopOver = () => this.setState({ popOverOpened: true })
    closePopOver = () => this.setState({ popOverOpened: false })

    handleChange = (e, { value }) => {
        const { actions: { updateAnswer }, currentQuestion: { type, localization: { id } }, answer, correctLimit } = this.props
    
        if (value){
            if ( correctLimit === false ){
                this.setState({ isAnswerCorrect: value }, () => {
                    updateAnswer(id, answer.id, { is_correct: value }, type)
                })
            }
        
        } else {
            this.setState({ isAnswerCorrect: value }, () => {
                updateAnswer(id, answer.id, { is_correct: value }, type)
            })
        }
    }
    changeListType = value => {
        const { actions: { updateCalendarQuestion }, currentQuestion: { localization: { id } } } = this.props
        updateCalendarQuestion(id, 'list_type', value)
    }

    render() {
        const { answer, currentQuestion, keyNumber } = this.props
        const { popOverOpened } = this.state

        const bulletType = currentQuestion.list_type === BULLET_LIST_TYPE
        const numberType = currentQuestion.list_type === NUMBER_LIST_TYPE
        const letterType = currentQuestion.list_type === LETTER_LIST_TYPE
        return (
            <div className={styles.optionWrapper} >
                {popOverOpened && (
                    <PopOver cbOnClickOutside={this.closePopOver} >
                        <div className={styles.popOverWrapper} >
                            <p>List type</p>
                            <div className={styles.listTypes}>
                                <div
                                    className={styles.listType}
                                    onClick={() => this.changeListType(BULLET_LIST_TYPE)}
                                    style={{ color: bulletType && '#fff' }}
                                >
                                    <div
                                        className={styles.square}
                                        style={{
                                        backgroundColor: answer.is_correct
                                            ? bulletType
                                            ? '#56DB4F'
                                            : '#2c2c2c'
                                            : bulletType
                                            ? '#FDA600'
                                            : '#2c2c2c'
                                        }}
                                    >
                                        <span className={styles.listTypeText}>
                                        <BulletIcon className={styles.bulletIcon} />
                                        </span>
                                    </div>
                                    <p>Bullet</p>
                                </div>
                                <div
                                    className={styles.listType}
                                    onClick={() => this.changeListType(NUMBER_LIST_TYPE)}
                                    style={{ color: numberType && '#fff' }}
                                >
                                    <div
                                        className={styles.square}
                                        style={{
                                        backgroundColor: answer.is_correct
                                            ? numberType
                                            ? '#56DB4F'
                                            : '#2c2c2c'
                                            : numberType
                                            ? '#FDA600'
                                            : '#2c2c2c'
                                        }}
                                    >
                                        <span className={styles.listTypeText}>1</span>
                                    </div>
                                    <p>Number</p>
                                </div>
                                <div
                                    className={styles.listType}
                                    onClick={() => this.changeListType(LETTER_LIST_TYPE)}
                                    style={{ color: letterType && '#fff' }}
                                    >
                                    <div
                                        className={styles.square}
                                        style={{
                                        backgroundColor: answer.is_correct
                                            ? letterType
                                            ? '#56DB4F'
                                            : '#2c2c2c'
                                            : letterType
                                            ? '#FDA600'
                                            : '#2c2c2c'
                                        }}
                                    >
                                        <span className={styles.listTypeText}>A</span>
                                    </div>
                                    <p>Letter</p>
                                </div>
                            </div>

                            <div className={styles.isAnswerCorrect}>
                                <CustomRadio
                                    label='Correct'
                                    name='radioGroup'
                                    value={1}
                                    checked={this.state.isAnswerCorrect === true}
                                    onChange={this.handleChange}
                                    className={styles.radio}
                                />
                                <CustomRadio
                                    label='Wrong'
                                    name='radioGroup'
                                    value={0}
                                    checked={this.state.isAnswerCorrect === false}
                                    onChange={this.handleChange}
                                    className={styles.radio}
                                />
                        </div>
                        </div>
                    </PopOver>
                )}
                <div className={styles.optionIconWrapper} >
                    <OptionIcon
                        actionOnClick={this.openPopOver}
                        keyNumber={keyNumber}
                        bulletType={bulletType}
                        numberType={numberType}
                        letterType={letterType}
                        elementStyle={( () => {
                            switch (this.state.isAnswerCorrect) {
                                case  true: {
                                    return { backgroundColor:'#4c7e14'}
                                }
                                case false: {
                                    return { backgroundColor:'rgba(155, 155, 155, 0.5)'}
                                }
                                default: return { backgroundColor:'#404040'}
                            }
                        })()}
                    />
                </div>
                <input className={styles.option} onBlur={this.updateAnswer} defaultValue={answer.text} key={answer.id} />
                <DeleteIcon className={styles.deleteIcon} onClick={this.deleteAnswer} />
            </div>
        )
    }
}

export default Answer