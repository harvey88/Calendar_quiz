import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createCalendarQuestion } from 'data/calendar/questions/actions'

import CustomDropdown from 'common/customDropdown/CustomDropdown'
import styles from './createHatchQuestion.css'
import CheckedBoxIcon from 'assets/svg/checkedBox.svg'
import MarkIcon from 'assets/svg/mark.svg'
import PollIcon from 'assets/svg/Poll.svg'
import ImageIcon from 'assets/svg/Image.svg'
import ScaleIcon from 'assets/svg/Scale.svg'
import InputIcon from 'assets/svg/input.svg'
import PlusButtonIcon from 'assets/svg/plusButton.svg'

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        createCalendarQuestion
    }, dispatch)
})

@connect(null, mapDispatchToProps)
export default class CreateHatchQuestion extends Component {
    handleQuestionTypeChange = (e, type) => {
        const {
            hatch,
            lang_id,
            actions: { createCalendarQuestion }
        } = this.props
        type && createCalendarQuestion(hatch.id, type, 'question_text', lang_id)
    }
    render() {
        const {
            hatch,
            questions
        } = this.props
        return (
            <div 
                style={questions && Object.keys(questions).length && hatch.type !== 'final' ? {
                    pointerEvents: 'none',
                    opacity: '0.5',
                    background: '#CCC'
                }: {}}
                className={styles.wrapperDropdown}>
                <CustomDropdown 
                    placeholder='Create question'
                    onChange={this.handleQuestionTypeChange}
                    options={[
                        {
                            icon: <CheckedBoxIcon className={styles.iconQuestion} />,
                            value: 'text',
                            text: 'Text question',
                        },
                        {
                            icon: <ImageIcon className={styles.iconQuestion} />,
                            value: 'image',
                            text: 'Image question'
                        },
                        // {
                        //     icon: <MarkIcon className={styles.iconQuestion} />,
                        //     value: 'mark',
                        //     text: 'Mark on image'
                        // },
                        // {
                        //     icon: <PollIcon className={styles.iconQuestion} />,
                        //     value: 'poll',
                        //     text: 'Poll'
                        // },
                        // {
                        //     icon: <CheckedBoxIcon className={styles.iconQuestion} />,
                        //     value: 'Order',
                        //     text: 'Order'
                        // },
                        {
                            icon: <ScaleIcon className={styles.iconQuestion} />,
                            value: 'scale',
                            text: 'Scale question'
                        },
                        /*{
                            icon: <InputIcon className={styles.iconQuestion} />,
                            value: 'input',
                            text: 'Input'
                        }, */
                        {
                            icon: <InputIcon className={styles.iconQuestion} />,
                            value: 'free_text',
                            text: 'Free text'
                        },
                    ]}
                    icon={<PlusButtonIcon className={styles.iconQuestionPlus}/>}
                />
            </div>
        )
    }
}