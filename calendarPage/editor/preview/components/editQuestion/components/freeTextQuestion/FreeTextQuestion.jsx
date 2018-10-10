import React, { Component } from 'react'
import styles from './freeTextQuestion.css'

import Cover from './componenets/cover/Cover'

class FreeTextQuestion extends Component {
    render() {
        const {
            currentQuestion,
            actions,
            changeQuestion
        } = this.props
        return(
            <div className={styles.wrapper} >
                <Cover actions={actions} currentQuestion={currentQuestion} />
                <div className={styles.content} >
                    <textarea 
                        placeholder="Type question"
                        className={styles.question}
                        onBlur={changeQuestion}
                        defaultValue={currentQuestion && currentQuestion.localization.text}
                        key={currentQuestion && currentQuestion.id}
                    />
                </div>
            </div>
        )
    }
}

export default FreeTextQuestion