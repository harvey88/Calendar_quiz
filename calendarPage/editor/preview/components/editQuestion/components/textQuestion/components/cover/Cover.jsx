import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

import styles from './cover.css'



export default class Cover extends Component {

    onDrop = (files) => {
        console.log('cover', this.props)
        const {
            actions: { uploadCalendarQuestionCover },
            currentQuestion: { id, localization }
        } = this.props
        uploadCalendarQuestionCover(id, localization.id, files[0] )
    }

    render() {
        const {
            currentQuestion
        } = this.props
        return(
            <Dropzone className={styles.wrapperImage} onDrop={files => this.onDrop(files)}>
            {currentQuestion.image ? (
                <img src={`${currentQuestion.image.url}`} className={styles.coverImage} />
            ) : (
                'Upload media'
            )}
            </Dropzone> 
        )
    }
}