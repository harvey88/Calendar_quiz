import React, { Component } from 'react'
import styles from './scaleQuestion.css'

import Cover from './components/cover/Cover'
import Answers from './components/answers/Answers'


class ScaleQuestion extends Component {
    render() {
        const {
            currentQuestion,
            actions,
            changeQuestion
        } = this.props
        return(
            <div className={styles.wrapper} >
                <div className={styles.content} >
                    <input 
                        placeholder="Type question"
                        className={styles.question}
                        onBlur={changeQuestion}
                        defaultValue={currentQuestion && currentQuestion.localization.text}
                        key={currentQuestion && currentQuestion.id}
                    />
                    <Answers
                        answers={currentQuestion && currentQuestion.localization.editor_mode_answers}
                        currentQuestion={currentQuestion}
                        actions={actions}
                    />
                </div>
                <Cover actions={actions} currentQuestion={currentQuestion} /> 
            </div>
        )
    }
}

export default ScaleQuestion