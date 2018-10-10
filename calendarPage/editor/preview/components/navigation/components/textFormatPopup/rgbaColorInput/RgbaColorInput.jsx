import React, { Component } from 'react'
import { SketchPicker } from 'react-color'

import {
    rgbaObjectToString, 
    rgbaStringToObject 
} from 'utils/transformations'
import PopOver from 'common/popOver/PopOver'
import styles from './rgbaColorInput.css'

export default class RgbaColorInput extends Component{
    constructor(props){
        super(props)
        this.state = {
            colorPickerOpened: false,
        }
    }
    onColorChange = color => this.props.onColorChange(rgbaObjectToString(color.rgb))
    toggleColorPicker = () => this.setState(prevState => ({colorPickerOpened: !prevState.colorPickerOpened}))
    render(){
        const {
            color,
        } = this.props
        return (
            <div>
                <div 
                    onClick={this.toggleColorPicker}
                    className={styles.inputWrapper}
                >
                    <div
                        className={styles.coloredCircle}
                        style={{
                            backgroundColor: color,
                        }}
                    />
                    <p className={styles.input}>
                        {color || 'Choose color'}
                    </p> 
                </div>
                {this.state.colorPickerOpened &&
                    <PopOver
                        cbOnClickOutside={this.toggleColorPicker}
                    >
                        <SketchPicker
                            className={styles.colorPicker}
                            color={rgbaStringToObject(color)}
                            onChange={this.onColorChange}
                        />                                  
                    </PopOver>
                }
            </div>
        )
    }
}