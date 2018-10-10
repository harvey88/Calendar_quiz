import React, { Component } from 'react'
import styles from './answers.css'

import Answer from './answer/Answer'
import OptionIcon from './optionIcon/OptionIcon'

import { BULLET_LIST_TYPE, NUMBER_LIST_TYPE, LETTER_LIST_TYPE } from './constants'



class Answers extends Component {
    addAnswer = e => {
        const { 
            actions: { createAnswer },
            currentQuestion,
            currentQuestion: { type, id }
        } = this.props
        const text = e.target.value
        if(text) {
            createAnswer(id, {text}, currentQuestion.localization.id, type)
            e.target.value = ''
        }
    }
    render() {
        const { answers, actions, currentQuestion } = this.props
        const bulletType = currentQuestion.list_type === BULLET_LIST_TYPE
        const numberType = currentQuestion.list_type === NUMBER_LIST_TYPE
        const letterType = currentQuestion.list_type === LETTER_LIST_TYPE

        return(
            <div className={styles.options} >
                {answers && 
                    answers.map((answer, i, answerArr) => {

                        const correctLimits = () => {
                            const correct =  answerArr.filter(( item ) => {
                                return item.is_correct
                            })
                
                            if (correct.length > 0) {
                                return true
                            } else {
                                return false }
                        }

                        return (
                            <Answer 
                                correctLimit = {correctLimits()}
                                answer={answer}
                                actions={actions}
                                currentQuestion={currentQuestion}
                                key={answer.id}
                                keyNumber={i}
                            />
                        )
                    })
                }
                
                <div className={styles.optionWrapper} >
                    <div className={styles.optionIconWrapper} >
                        <OptionIcon 
                            keyNumber={answers && answers.length}
                            bulletType={bulletType}
                            numberType={numberType}
                            letterType={letterType}
                        />
                    </div>
                    <input className={styles.option} onBlur={this.addAnswer} placeholder='Add option' />
                </div>
            </div>
        )
    }
}

export default Answers