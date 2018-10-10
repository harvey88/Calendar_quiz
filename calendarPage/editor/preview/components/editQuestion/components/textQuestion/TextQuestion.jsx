import React, { Component } from 'react'
import styles from './textQuestion.css'

import Answers from './components/answers/Answers'
import Cover from './components/cover/Cover'

class TextQuestion extends Component {
    render() {
        const {
            currentQuestion,
            actions,
            changeQuestion
        } = this.props
        return(
            <div className={styles.wrapper} >
                <Cover actions={actions} currentQuestion={currentQuestion} />
                <div className={styles.content}>
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
            </div>
        )
    }
}

export default TextQuestion