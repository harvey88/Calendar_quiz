import React, { Component, Fragment } from 'react'
import Popup from 'common/popUp/PopUp'
import QuestionLibrary from './questionLibrary/QuestionLibrary'
import Close from 'assets/svg/close.svg'
import styles from './addLibrary.css'
import CustomDropdown from 'common/customDropdown/CustomDropdown'
import PlusButtonIcon from 'assets/svg/plusButton.svg'


class AddLibrary extends Component {
    state = {
        questions: null,
        questionID: null
    }
    handleChooseQuestionTypeChange = (e, type) => {
        const {
            calendar: { quizzes_list },
            hatch
        } = this.props
        let questions = quizzes_list.filter(el => { if(el.quiz_id === type) return el })
                                    .map(question => question.questions)[0]

        this.setState({
            questions: questions,
            quizID: type
        })
        // console.log('type', this.props)
    }

    handleChange = (e, value) => {
        this.setState({
            questionID: value.value
        })
        console.log('value', value.value)
    }

    handleAddQuestion = () => {
        console.log('add library', this.props)
        const {
            actions: {calendarQuestionCopy},
            hatch: { id },
            closePopupAddLibrary
        } = this.props
        calendarQuestionCopy(this.state.questionID, id)
        closePopupAddLibrary()
    }

    render() {
        const {
            handleToggleTemplateHatch,
            closePopupAddLibrary,
            calendar: { quizzes_list },
            handleClick
        } = this.props
        const {
            questions,
            questionID
        } = this.state

        let quizzesList = quizzes_list.map(el => {
            return {
                value: el.quiz_id,
                text: el.name
            }
        })
        return(
            <Popup
                handleClose={handleToggleTemplateHatch}
                windowStyle={{
                    minHeight: '66rem',
                    maxHeight: '60%',
                    width: '65%',
                    borderRadius: '1rem',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 7.4rem 0 rgba(0, 0, 0, 0.11)'
                }}
            >
            <div className={styles.wrapper} onClick={handleClick} >
                <Close onClick={closePopupAddLibrary} className={styles.closePopup} />
                <div className={styles.title} >Question list</div>
                <div className={styles.wrapperSearch} >
                    <div className={styles.dropdown} >
                    <CustomDropdown
                        placeholder='Choose quiz'
                        onChange={this.handleChooseQuestionTypeChange}
                        options={quizzesList}
                        />
                    </div>
                    <div className={styles.wrapperInput} >
                        <input 
                            type='text'
                            placeholder='Search'
                            className={styles.input}
                        />
                    </div>
                    
                </div>
                {questions ? 
                    <Fragment>
                        {questions.map(el => (
                            <QuestionLibrary 
                                handleChange={this.handleChange}
                                key={el.id}
                                text={el.text}
                                type={el.answer_model}
                                value={el.id}
                                option={questionID}
                            />
                        ))}
                    </Fragment> :
                <p className={styles.textQuiz}>Choose quiz</p>
                }
                    <div 
                        style={!questionID ? {
                            pointerEvents: 'none',
                            opacity: '0.5',
                            background: '#CCC'
                        }: {}}
                        className={styles.addButton}
                        onClick={this.handleAddQuestion}
                        >
                        <PlusButtonIcon style={{ width: '20px', marginRight: '1rem' }} />
                        <span>Add Question</span>
                    </div>
            </div>
            </Popup> 
        )
    }
}

export default AddLibrary