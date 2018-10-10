import React, { Component } from 'react'

import Answer from './answer/Answer'

import styles from './answers.css'

class Answers extends Component {
    render() {
        const { answers, currentQuestion, actions } = this.props

        const answersList = () => {
            return answers.map((answer, i, answerArr) => {
                const correctLimits = () => {
                    const correct =  answerArr.filter(( item ) => {
                    return item.is_correct
                    })
                    if (correct.length > 0) {
                    return true
                    } else {
                    return false }
                }
        
                return <Answer
                    correctLimits={correctLimits()}
                    currentQuestion={currentQuestion}
                    key={answer.id}
                    keyNumber={i}
                    actions={actions}
                    answer={answer}/>
                })
        }

        return(
            <div className={styles.options} >
                {answers && answersList() }
                <Answer currentQuestion={currentQuestion} type={'newAnswer'} actions={actions} keyNumber={answers ? answers.length : 0}  />
            </div>
        )
    }
}

export default Answers