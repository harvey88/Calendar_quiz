import React, { Component, Fragment } from 'react'

import styles from './imageQuestion.css'

import Answers from './components/answers/Answers'

class ImageQuestion extends Component {
    render() {
        const { currentQuestion, actions, changeQuestion } = this.props
        return(
            <Fragment>
                <div className={styles.content}>
                    <input
                        placeholder='Type question'
                        className={styles.question}
                        onBlur={changeQuestion}
                        defaultValue={currentQuestion && currentQuestion.localization.text}
                        key={currentQuestion && currentQuestion.id}
                    />
                        <Answers
                        answers={currentQuestion && currentQuestion.localization.editor_mode_answers}
                        actions={actions}
                        currentQuestion={currentQuestion} 
                    />
                </div> 
            </Fragment>
        )
    }
}

export default ImageQuestion