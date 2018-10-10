import React from 'react'
import styles from './questions.css'

import Question from './question/Question'
import DeleteIcon from 'assets/svg/delete.svg'

const Questions = ({questions, handleEditQuetion, onHandleDeleteQuestion}) => {
    return (
        <div>
            {questions && Object.values(questions).map(question => (
                <div className={styles.wrapper} key={question.id} >
                    <Question 
                        question={question}
                        handleEditQuetion={handleEditQuetion}
                    />
                    <DeleteIcon 
                        onClick={() => onHandleDeleteQuestion(question)}
                        className={styles.iconStyle} /> 
                </div>
            ))} 
        </div>
    )
}

export default Questions