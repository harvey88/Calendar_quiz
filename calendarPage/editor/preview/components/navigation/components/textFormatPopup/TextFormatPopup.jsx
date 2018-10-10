import React, { Component } from 'react'
import styles from './textFromatPopup.css'
import {remToPixel, pixelToRem} from 'utils/transformations'
import PopOver from 'common/popOver/PopOver'
import RgbaColorInput from './rgbaColorInput/RgbaColorInput'

import AlignLeft from 'assets/svg/alignLeft.svg'
import AlignCenter from 'assets/svg/alignCenter.svg'
import AlignRight from 'assets/svg/alignRight.svg'
import AlignJustify from 'assets/svg/text-justify.svg'
import Bold from 'assets/svg/format-bold.svg'
import Italic from 'assets/svg/format-italic.svg'

export default class TextFormatPopup extends Component {

    render() {
        const { fontStyle, closePopOver, changeStyles } = this.props
        return (
            <div className={styles.popupWrapper}>
                <PopOver cbOnClickOutside={closePopOver}>
                    <div className={styles.popOverWrapper}>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.textAlignmentWrapper}>
                                <AlignLeft
                                    className={`${styles.textAlignmentIcon} ${fontStyle.textAlign == 'left' ? styles.textAlignmentIconActive : ''}`}
                                    onClick={() => changeStyles('textAlign', 'left')}
                                />
                                <AlignCenter
                                    className={`${styles.textAlignmentIcon} ${fontStyle.textAlign == 'center' ? styles.textAlignmentIconActive : ''}`}
                                    onClick={() => changeStyles('textAlign', 'center')}
                                />
                                <AlignRight
                                    className={`${styles.textAlignmentIcon} ${fontStyle.textAlign == 'right' ? styles.textAlignmentIconActive : ''}`}
                                    onClick={() => changeStyles('textAlign', 'right')}
                                />
                                <AlignJustify
                                    className={`${styles.textAlignmentIcon} ${fontStyle.textAlign == 'justify' ? styles.textAlignmentIconActive : ''}`}
                                    onClick={() => changeStyles('textAlign', 'justify')}
                                />
                            </div>
                           {/* <div className={styles.textAlignmentWrapper}>
                                <VerticalAlignTop
                                    className={`${styles.textAlignmentIcon} ${fontStyle.alignItems == 'flex-start' ? styles.textAlignmentIconActive : ''}`}
                                    onClick={() => changeStyles('alignItems', 'flex-start')}
                                />
                                <VerticalAlignCenter
                                    className={`${styles.textAlignmentIcon} ${fontStyle.alignItems == 'center' ? styles.textAlignmentIconActive : ''}`}
                                    onClick={() => changeStyles('alignItems', 'center')}
                                />
                                <VerticalAlignBottom
                                    className={`${styles.textAlignmentIcon} ${fontStyle.alignItems == 'flex-end' ? styles.textAlignmentIconActive : ''}`}
                                    onClick={() => changeStyles('alignItems', 'flex-end')}
                                />
                            </div>*/}
                            <RgbaColorInput
                                color={fontStyle.color}
                                onColorChange={ color => changeStyles('color', color)}
                            />
                            <div className={styles.textSizeInputWrapper}>
                                <input
                                    type='number'
                                    className={styles.textSizeInput}
                                    value={remToPixel(fontStyle.fontSize)}
                                    onChange={e => changeStyles('fontSize', pixelToRem(e.target.value) + 'rem')}
                                />
                                <span className={styles.textSizeAdditionalText}>px</span>
                                <Bold className={styles.fontStyleIcon} onClick={() => changeStyles('fontStyle', 'bold')}/>
                                <Italic className={styles.fontStyleIcon} onClick={() => changeStyles('fontStyle', 'italic')}/>
                            </div>

                        </div>
                    </div>

                </PopOver>
            </div>
        )
    }
}
