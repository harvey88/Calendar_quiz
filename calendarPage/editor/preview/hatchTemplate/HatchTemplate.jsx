import React, { Component, Fragment } from 'react'
import styles from './hatchTemplate.css'
import { connect } from 'react-redux'

import Popup from 'common/popUp/PopUp'
import PopOver from 'common/popOver/PopOver'
import { SketchPicker } from 'react-color'
import {
    rgbaObjectToString, 
    rgbaStringToObject 
} from 'utils/transformations'
import Upload from 'assets/svg/upload.svg'
import Dropzone from 'react-dropzone'
import { requestImageUpload } from 'data/images/api'
import PlayBytton from './playButton/PlayButton'
import CreateHatchQuestion from './createHatchQuestion/CreateHatchQuestion'
import PlusButtonIcon from 'assets/svg/plusButton.svg'
import Close from 'assets/svg/close.svg'
import Questions from '../components/questions/Questions'
import AddLibrary from '../components/library/AddLibrary'
import EditQuestion from '../components/editQuestion/EditQuestion'
import PinIcon from 'assets/svg/pinHatch.svg'
import DropdownHatch from '../components/dropdownHatch/DropdownHatch'

import { 
    deleteCalendarQuestion, 
    getCalendarQuizzesList, 
    calendarQuestionCopy,
    getHatchQuestions
} from 'data/calendar/questions/actions'
import {bindActionCreators} from 'redux';


const mapDispatchToProps = dispatch => ({ 
    actionsQuestions: bindActionCreators(
        {
            deleteCalendarQuestion, 
            getCalendarQuizzesList, 
            calendarQuestionCopy,
            getHatchQuestions 
        }, dispatch
    )
})

const mapStateToProps = ({ questions }) => ({ questions })

@connect( mapStateToProps, mapDispatchToProps )
class CreateHatchTemplate extends Component {
    constructor() {
        super()

        this.state = {
            toggleSketchPicker: false,
            background: '',
            image_id: '',
            title: '',
            description: '',
            legal: '',
            popOverOpened: null,
            defaultButton: {
                buttonCol : {
                    color: 'rgb(255, 255, 255)',
                },
                buttonBg : {
                    background: 'rgb(3, 151, 214)',
                },
                button : {
                    borderRadius: '2rem'
                },
                boxShadow: 'none',
            },
            disableQuestion: null,
            toggleLibrary: false,
            showEditQuestion: true,
            currentQuestion: null
        }
    }
    componentDidMount() {
        const { currentHatch, actionsQuestions: {getHatchQuestions} } = this.props
            let toObjBtn
            if(currentHatch && currentHatch.button) {
                toObjBtn = JSON.parse(currentHatch.button)
            } else {
                toObjBtn = null
            }
            this.setState({
                background: currentHatch && currentHatch.background ? currentHatch.background: 'rgb(245, 166, 35)' ,
                image_id: currentHatch && currentHatch.image ? currentHatch.image.url: null,
                title: currentHatch && currentHatch.title,
                description: currentHatch && currentHatch.description,
                legal: currentHatch && currentHatch.legal,
                defaultButton: toObjBtn ? toObjBtn: this.state.defaultButton
            })
            getHatchQuestions(currentHatch.id)
    }
    componentWillReceiveProps(nextProps) {
        const {
            currentQuestion
        } = this.state
        const newQuestions = Object.keys(nextProps.questions).map(i => nextProps.questions[i])
        if(currentQuestion) {
            const newCurrentQuestion = newQuestions.filter(el => el.id  === currentQuestion.id )[0]
            this.setState({
                currentQuestion: newCurrentQuestion
            })
        }
        
    }
    handleToglePicker = () => {
        this.setState(prevState => ({
            toggleSketchPicker: !prevState.toggleSketchPicker
        }))
    }
    onColorChange = (color, hatch) => {
        let bgColor = rgbaObjectToString(color.rgb)
        this.setState({
            background: bgColor
        })
        this.applyUpdates(hatch)

    }
    onDrop = (acceptedFiles, hatchPart) => {
        const {
            actionsCalendar: { updateHatch }, 
            calendar: { id, hatches},
            currentHatch
        } = this.props        
        acceptedFiles.forEach(file => {
            requestImageUpload(file)
                .then(image => {
                    this.setState({[hatchPart]: image.url })
                    updateHatch(id, currentHatch.id, { [hatchPart]: image.id  })
                })
        })
    }

    openPopOver = (popOverID) => {
        this.state.popOverOpened ? this.closePopOver() : null
        this.setState({ popOverOpened: popOverID })
    }

    closePopOver = () => {
        const {
            actionsCalendar: { updateHatch }, 
            calendar: { id },
            currentHatch
        } = this.props
        const buttonObj = JSON.stringify(this.state.defaultButton)
        this.setState({ popOverOpened: null }, 
            () => { updateHatch(id, currentHatch.id, { button: buttonObj }) } 
        )
    }

    changeStyles = (object, property, value) => {
        const { defaultButton } = this.state
        this.setState({
            defaultButton: {...defaultButton,
                [object]: {...defaultButton[object], [property]: value}
            }
        })
    }

    applyUpdates = (hatchPart) => {
        const {
            actionsCalendar: { updateHatch }, 
            calendar: { id },
            currentHatch
        } = this.props
        updateHatch(id, currentHatch.id, { [hatchPart]: this.state[hatchPart] })
    }

    onHandleDeleteQuestion = (question) => {
        const {
            actionsQuestions: { deleteCalendarQuestion }
        } = this.props
        deleteCalendarQuestion(question.localization.id)
    }

    handleAddLibrary = () => {
        this.setState({
            toggleLibrary: true
        })
        const {
            actionsQuestions: {
                getCalendarQuizzesList
            }
        } = this.props
        getCalendarQuizzesList()
    }

    closePopupAddLibrary = () => {
        this.setState({
            toggleLibrary: false
        })
    }

    handleEditQuetion = (question) => {
        this.setState({
            showEditQuestion: false,
            currentQuestion: question
        })
    }

    closePopupEditQuestion = () => {
        this.setState({
            showEditQuestion: true
        })
    }

    render() {
        const { 
            handleClick, 
            handleChangeHatch,
            handleCloseHatchTemplate,
            calendar: { lang_id},
            currentHatch,
            calendar,
            actionsCalendar,
            questions,
            hatches
        } = this.props
        const { 
            background, 
            image_id, 
            toggleSketchPicker, 
            title, 
            description, 
            legal,
            popOverOpened,
            defaultButton,
            toggleLibrary,
            showEditQuestion,
            currentQuestion
        } = this.state
        // console.log('hatch props', this.props)
        return (
            <Popup
                handleClose={handleCloseHatchTemplate}
                windowStyle={{
                    minHeight: '66rem',
                    maxHeight: '52%',
                    width: '65%',
                    borderRadius: '1rem',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 7.4rem 0 rgba(0, 0, 0, 0.11)'
                }}
            >
                <div className={styles.wrapper} onClick={handleClick} >
                    <div className={styles.header} style={{background: background}} >
                        <DropdownHatch 
                            currentHatch={currentHatch}
                            hatches={hatches}
                            handleChangeHatch={handleChangeHatch} />
                        <div className={styles.wrapperRightBlock}>
                            <div className={styles.pin}>
                                <PinIcon />
                                <span className={styles.textPin} >Pin</span>
                            </div>
                            <div className={styles.wrapperColor} onClick={this.handleToglePicker} >
                                <span className={styles.circle} ></span>
                                <span className={styles.text} >Hatch color</span>
                            </div>
                        </div>
                        <Close onClick={handleCloseHatchTemplate} className={styles.closePopup} />
                    </div>
                    {showEditQuestion ? 
                    <div className={styles.wrapperScroll} >
                        <div className={styles.main}>
                            <div className={styles.leftBlock}>
                                <div className={styles.inputsBlock}>
                                    <input 
                                        placeholder='Title'
                                        type="text"
                                        value={title ? title: ''}
                                        onChange={e => this.setState({title: e.target.value})}
                                        onBlur={() => this.applyUpdates('title') }
                                        className={styles.input} />
                                    <textarea 
                                        style={{fontSize: '2rem'}}
                                        placeholder='Description'
                                        type="text"
                                        value={description ? description: ''}
                                        onChange={e => this.setState({description: e.target.value})}
                                        onBlur={() => this.applyUpdates('description') }
                                        className={styles.input} />
                                    <input 
                                        placeholder='Legal'
                                        type="text"
                                        value={legal ? legal: ''}
                                        onChange={e => this.setState({legal: e.target.value})}
                                        onBlur={() => this.applyUpdates('legal') } 
                                        className={styles.input} />
                                </div>
                                <PlayBytton
                                        popOverOpened={popOverOpened}
                                        openPopOver={this.openPopOver} 
                                        buttonStyle={defaultButton}
                                        changeStyles={this.changeStyles}
                                        closePopOver={this.closePopOver}
                                    />
                                <div>
                                    <div className={styles.titleQuestion} >Questions</div>
                                    <div className={styles.wrapperQuestion} >
                                        <CreateHatchQuestion 
                                            hatch={currentHatch}
                                            questions={questions}
                                            lang_id={lang_id} />
                                        <div 
                                            style={questions && Object.keys(questions).length && currentHatch.type !== 'final' ? {
                                                pointerEvents: 'none',
                                                opacity: '0.5',
                                                background: '#CCC'
                                            }: {}}
                                            className={styles.addButton}
                                            onClick={this.handleAddLibrary}
                                            >
                                            <PlusButtonIcon style={{ width: '20px'}} />
                                            <span>Add from library</span>
                                        </div>
                                    </div>
                                </div>                          
                            </div>
                            <Dropzone className={styles.rightBlock} onDrop={files => this.onDrop(files, 'image_id') }>
                                {image_id ?
                                    <div   
                                        className={styles.noWrapperUpload}
                                        style={{ background: `url(${image_id})`}}  >
                                    </div>
                                    :
                                    (
                                    <div className={styles.wrapperUpload}  >
                                        <Upload style={{ fill: '#fff' }} />
                                        <span>Upload media</span>
                                    </div>
                                    )
                                }
                            </Dropzone>
                        </div>
                        {questions && Object.keys(questions).length ? 
                                <Questions 
                                    questions={questions}
                                    handleEditQuetion={this.handleEditQuetion}
                                    onHandleDeleteQuestion={this.onHandleDeleteQuestion}  />
                        : null}
                    </div> : 
                    <EditQuestion 
                            closePopupEditQuestion={this.closePopupEditQuestion}
                            currentQuestion={currentQuestion}
                            hatch={currentHatch}
                            question={questions}
                        />
                    }  
                    {toggleSketchPicker &&
                        <PopOver
                            onClick={handleClick}
                        >
                            <SketchPicker
                                className={styles.colorPicker}
                                color={rgbaStringToObject(background)}
                                onChange={(color) => this.onColorChange(color, 'background')}
                            />                                  
                        </PopOver>}
                    {toggleLibrary &&
                        <AddLibrary
                            toggleLibrary={toggleLibrary}
                            calendar={calendar}
                            hatch={currentHatch}
                            actions={actionsCalendar}
                            closePopupAddLibrary={this.closePopupAddLibrary}
                        />
                    }                   
                </div>
            </Popup>   
        )
    }
}

export default CreateHatchTemplate