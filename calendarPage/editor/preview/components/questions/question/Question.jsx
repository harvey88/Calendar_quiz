import React, { Component } from 'react'
import styles from './question.css'
import CheckedBox from 'assets/svg/checkedBox.svg'
import Mark from 'assets/svg/mark.svg'
import Scale from 'assets/svg/Scale.svg'
import Image from 'assets/svg/Image.svg'
import Poll from 'assets/svg/Poll.svg'
import Input from 'assets/svg/input.svg'

export default class Question extends Component {

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

    render() {
        const {
            question,
            question: { type, localization },
            handleEditQuetion
        } = this.props
        return(
            <div className={styles.question} onClick={() => handleEditQuetion(question)} >
                {this.itemIcon(type)} <span>{localization && localization.text}</span>
            </div>
        )
    }
}