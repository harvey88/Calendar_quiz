import React, { Component } from 'react'
import CustomRadio from 'common/customRadio/CustomRadio'
import CheckedBox from 'assets/svg/checkedBox.svg'
import Mark from 'assets/svg/mark.svg'
import Scale from 'assets/svg/Scale.svg'
import Image from 'assets/svg/Image.svg'
import Poll from 'assets/svg/Poll.svg'
import Input from 'assets/svg/input.svg'
import styles from './questionLibrary.css'

class QuestionLibrary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: props.value
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.checked !== props.value) {
            return {
                checked: props.value
            }
        }
        return null
    }

    itemIcon = (questionType) => {
        switch (questionType) {
            case 'text':
                return <CheckedBox className={styles.iconStyle}/>
            case 'mark':
                return <Mark className={styles.iconStyle}/>
            case 'scale':
                return <Scale className={styles.iconStyle}/>
            case 'image':
                return <Image className={styles.iconStyle}/>
            case 'free_text':
                return <Input className={styles.iconStyle}/>
            case 'poll':
                return <Poll className={styles.iconStyle}/>
            default:
                return null
        }
    }
    render () {
        const {
            text, type, handleChange, option
        } = this.props
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapperQuestion}>
                    <div className={styles.wrapperText}>
                        <p>{this.itemIcon(type)}</p>
                        <p>{text}</p>
                    </div>
                    <CustomRadio
                        name='radioGroup'
                        value={this.state.checked}
                        checked={this.state.checked === option}
                        onChange={handleChange}
                    />
                </div>
            </div>
        )
    }
}

export default QuestionLibrary