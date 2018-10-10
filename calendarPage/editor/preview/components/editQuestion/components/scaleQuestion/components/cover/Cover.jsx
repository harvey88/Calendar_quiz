import React, { Component, Fragment } from 'react'
import styles from './cover.css'
import Crop from 'components/crop/Crop'


class Cover extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cropVisible: false
        }
    }
    imageCrop = (files) => {
        const {
            actions: { uploadCalendarQuestionCover },
            currentQuestion: { id, localization }
        } = this.props
        uploadCalendarQuestionCover(id, localization.id, files)
    }

    handleShowCropFrime = () => {
        this.setState({
            cropVisible: true
        })
    }
    closeHandle = () => {
        this.setState({
            cropVisible: !this.state.cropVisible
        })
    }
    render() {
        const { currentQuestion } = this.props
        return(
            <Fragment>
            <div className={styles.wrapperImage} onClick={this.handleShowCropFrime} >
                {currentQuestion.image ? (
                    <img src={`${currentQuestion.image.url}`} className={styles.coverImage} />
                ) : (
                    'Upload media'
                )}
            </div>
            {this.state.cropVisible && (
                    <Crop 
                        croppedResult={'file'}
                        style={{left: '40%', top:'50%', transform:'translateY(-50%)'}}
                        image={this.imageCrop}
                        closeHandle={this.closeHandle}
                    />
                )}
            </Fragment>
        )
    }
}

export default Cover