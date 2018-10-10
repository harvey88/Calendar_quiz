import React, { Component } from 'react'
import styles from './editQuestion.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TextQuestion from './components/textQuestion/TextQuestion'
import ImageQuestion from './components/imageQuestion/ImageQuestion'
import ScaleQuestion from './components/scaleQuestion/ScaleQuestion'
import FreeTextQuestion from './components/freeTextQuestion/FreeTextQuestion'
import PollQuestion from './components/pollQuestion/PollQuestion'
import { uploadCalendarQuestionCover, updateCalendarQuestion } from 'data/calendar/questions/actions'
import { createAnswer, updateAnswer, deleteAnswer } from 'data/calendar/questions/answers/actions'

import Close from 'assets/svg/close.svg'

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        uploadCalendarQuestionCover,
        updateCalendarQuestion,
        createAnswer,
        updateAnswer,
        deleteAnswer
    }, dispatch)
})

@connect(null, mapDispatchToProps)
class EditQuestion extends Component {

    changeQuestion = e => {
        const {
            actions: { updateCalendarQuestion },
            currentQuestion: { localization: { id } }
        } = this.props
        const updatedText = e.target.value
        updateCalendarQuestion(id, 'text', updatedText)
    }

    render() {
        const {
            closePopupEditQuestion,
            actions,
            currentQuestion
        } = this.props
        // console.log('questions', this.props)

        return (
            <div style={{position: 'relative'}}>
                <Close onClick={closePopupEditQuestion} className={styles.closePopup} />
                {currentQuestion && currentQuestion.type === 'text' && (
                    <TextQuestion currentQuestion={currentQuestion} actions={actions} changeQuestion={this.changeQuestion} />
                )}
                {currentQuestion && currentQuestion.type === 'image' && (
                    <ImageQuestion currentQuestion={currentQuestion} actions={actions} changeQuestion={this.changeQuestion} />
                )}
                {currentQuestion && currentQuestion.type === 'scale' && (
                    <ScaleQuestion currentQuestion={currentQuestion} actions={actions} changeQuestion={this.changeQuestion} />
                )}
                {currentQuestion && currentQuestion.type === 'free_text' && (
                    <FreeTextQuestion currentQuestion={currentQuestion} actions={actions} changeQuestion={this.changeQuestion} />
                )}
                {currentQuestion && currentQuestion.type === 'poll' && (
                    <PollQuestion currentQuestion={currentQuestion} actions={actions} changeQuestion={this.changeQuestion} />
                )}
            </div>
        )
    }
}

export default EditQuestion