import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'

import DeleteIcon from 'assets/svg/trash2.svg'
import CheckIcon from 'assets/svg/plus.svg'
import Checkboxicon from 'assets/svg/checkbox 2.svg'

import styles from './answer.css'

export default class Answer extends Component {
    onDrop = acceptedFiles => {
        const { actions: { createAnswer }, currentQuestion, currentQuestion: { type, localization: { id } } } = this.props
        acceptedFiles.forEach(file => createAnswer(currentQuestion.id, { image: file }, id, type))
    }
    deleteAnswer = e => {
        const { actions: { deleteAnswer }, currentQuestion: { type, localization: { id } }, answer } = this.props
        e.preventDefault()
        e.stopPropagation()
        deleteAnswer(id, answer.id, type)
    }
    makeAnswerCorrect = e => {
        const { actions: { updateAnswer }, currentQuestion: { type, localization: { id } }, answer, correctLimits } = this.props

        e.preventDefault()
        e.stopPropagation()
        if(correctLimits === false)
        updateAnswer(id, answer.id, { is_correct: 1 }, type)
    }


    makeAnswerUnCorrect = e => {
        const { actions: { updateAnswer }, currentQuestion: { type, localization: { id } }, answer } = this.props
        e.preventDefault()
        e.stopPropagation()
        updateAnswer(id, answer.id, { is_correct: 0 }, type)
    }

    render() {
        const { type, answer, keyNumber } = this.props

        return (
        <div className={`${styles.answerWrapper} ` + (type === 'newAnswer' ? styles.newAnswer : '')}>
            <div
            className={`${styles.contentWrapper} ` + (answer && answer.is_correct ? styles.correct : '')}>
            <Dropzone onDrop={this.onDrop} className={styles.wrapper} style={{ width: '100%', height: '100%' }}>
                {type === 'newAnswer' ? (
                <div className={styles.content}>
                    <CheckIcon className={styles.addIcon} />
                </div>
                ) : (
                <Fragment>
                <img className={styles.answerImage} src={answer && answer.image && answer.image.url} />
                <div className={styles.answerActions}>
                    {answer && !answer.is_correct ?
                    <CheckIcon className={styles.actionIcon} onClick={this.makeAnswerCorrect}/> :
                    <Checkboxicon
                    className={styles.actionIcon}
                    onClick={this.makeAnswerUnCorrect}
                />}

                    <DeleteIcon className={styles.actionIcon} onClick={this.deleteAnswer}/>
                </div>
                </Fragment>
                )}
            </Dropzone>
            </div>
            {type === 'newAnswer' ? 
                <div className={styles.footerNewAnswer} >Add poll option</div>
                :
                <div className={styles.footer}>Option {keyNumber + 1}</div>
            }
        </div>
        )
    }
}
