import React, { Component } from 'react'
import styles from './PlayButton.css'
import PopOver from 'common/popOver/PopOver'
import RgbaColorInput from '../../../../../quizPage/settings/components/appearance/components/rgbaColorInput/RgbaColorInput'
import MaxRadiusButton from 'assets/svg/maxRadiusButton.svg'
import MiddleRadiusButton from 'assets/svg/middleRadiusButton.svg'
import NoRadiusButton from 'assets/svg/noRadiusButton.svg'

class PlayBytton extends Component {

    changeButtonTextColor = color => {
        console.log('colorbutton', color)
        this.props.changeStyles('buttonCol', 'color', color)
    }
    changeButtonBackgroundColor = color => {
        console.log('bgcolor', color)
        this.props.changeStyles('buttonBg', 'background', color)
    }
    changeButtonBorderRadius = borderRadius => () => {
        console.log('borderRadius', borderRadius)
        this.props.changeStyles('button', 'borderRadius', borderRadius)
    }

    
    render() {
        let objStyle = buttonStyle
        const { openPopOver, popOverOpened, closePopOver, buttonStyle } = this.props
        return(
            <div className={styles.wrapper}>
                <div className={styles.buttonSave} style={{color: buttonStyle.buttonCol.color, background:buttonStyle.buttonBg.background, borderRadius:buttonStyle.button.borderRadius }} onClick={ () => openPopOver('button')} >Play</div>
                {popOverOpened === 'button' && <PopOver cbOnClickOutside={closePopOver} >
                    <div className={styles.popOverWrapper}>
                        <RgbaColorInput color={buttonStyle.buttonCol.color} letter={true} onColorChange={this.changeButtonTextColor}/>
                        <RgbaColorInput color={buttonStyle.buttonBg.background}  onColorChange={this.changeButtonBackgroundColor}/>
                    <div className={styles.buttons}>
                        <MaxRadiusButton onClick={this.changeButtonBorderRadius('2rem')}/>
                        <MiddleRadiusButton onClick={this.changeButtonBorderRadius('0.5rem')}/>
                        <NoRadiusButton onClick={this.changeButtonBorderRadius('0rem')}/>
                    </div>
                    </div>
                </PopOver> }
            </div>
        )
    }
}

export default PlayBytton

